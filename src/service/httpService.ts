import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { environment } from './environment';

declare module "axios" {
    interface AxiosRequestConfig {
        responseMapper?: MapResponseHandler<any>
    }
}


export class HttpService {
    public static readonly IdentityMapping = (data: any) => data;

    private responseMapper: MapResponseHandler<any>
    private http: AxiosInstance;
    private resourceUrl: string
    private deferredRequests: any[] = []
    protected getResponseMapper(): MapResponseHandler<any> {
        return this.responseMapper
    }
    private get authorizationToken(): any {
        return environment.token
    }
    private set authorizationToken(value: any) {
        environment.token = value
    }

    protected getResourceUrl(): any {
        if (this.resourceUrl === null) {
            throw new Error(`Argument 'resourceUrl' is NULL.`)
        }

        return this.resourceUrl
    }


    get<T>(request?: IRequest<T>): Promise<T> {
        return this.sendRequest<T>('get', request)
    }

    constructor(resourceUrl: string, responseMapper?: MapResponseHandler<any>) {
        this.http = axios.create({
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })

        this.http.interceptors.request.use(c => this.addAuthorizationHeaderInterceptor(c))
        this.http.interceptors.response.use(
            r => r,
            e => this.addUnauthorizedInterceptor(e)
        )
        this.http.interceptors.response.use(r => this.mapResponse(r))

        this.responseMapper = responseMapper || HttpService.IdentityMapping
        this.resourceUrl = resourceUrl
    }

    private sendRequest<T>(type: string, request?: IRequest<T>) {
        const config = Object.assign({
            responseType: "json",
            responseMapper: null,
            processResult: null,
            data: null,
            params: null,
            headers: null
        }, request)
        return <any>this.http.request({ url: this.buildUrl(request), baseURL: environment.baseUrl, params: config.params })
    }

    private mapResponse(response: AxiosResponse) {
        const mapper = response.config.responseMapper || this.getResponseMapper()
        if (response.config.responseType !== "json") {
            return mapper(response.data)
        }

        return this.mapResponseData(response.data, mapper)
    }

    private addAuthorizationHeaderInterceptor(config: AxiosRequestConfig) {
        if (this.authorizationToken === null) {
            return config
        }
        config.headers = config.headers || {}
        Object.assign(config.headers, { "Authorization": `Bearer ${this.authorizationToken}` })
        return config
    }


    private mapResponseData(data: any, mapper: MapResponseHandler<any>): any {
        return Array.isArray(data)
            ? data.map(mapper)
            : mapper(data)
    }

    private buildUrl(request?: IRequest<any>): string {
        let url = request && request.resourceBaseUrl !== undefined
            ? request.resourceBaseUrl
            : this.getResourceUrl()

        url = request && request.resourceId !== undefined
            ? `${url}/${request.resourceId}`
            : url

        url = request && request.path !== undefined
            ? `${url}/${request.path}`
            : url

        url = url.replace(/\/+/gm, "/")

        return url
    }

    private addUnauthorizedInterceptor(error: AxiosError) {
        const { config: originalRequest } = error

        if (error.response?.status === 401) {
            this.http.request({ url: "/auth", baseURL: environment.baseUrl, method: "POST", data: { "apiKey": environment.apiKey } })
                .then((r: any) => {
                    this.authorizationToken = r.token
                    this.deferredRequests.map(retry => retry(r.token))
                }).finally(() => {
                    this.deferredRequests = []
                })

            return new Promise(resolve => {
                this.deferredRequests.push((token: any) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return resolve(axios(originalRequest))
                })
            })
        } else {
            return Promise.reject(error)
        }
    }


}

export interface IRequest<T> {
    params?: any | URLSearchParams
    responseMapper?: MapResponseHandler<T>
    data?: any
    path?: string
    resourceBaseUrl?: string
    resourceId?: any
    responseType?: string
    processResult?: MapResponseHandler<T>
    headers?: any
}

export interface IFileResponse {
    content: Blob
    fileName: string
}

export interface MapResponseHandler<T> {
    (json: any): T
}


export interface Config {
    REACT_APP_BASE_API_URL: string
    REACT_APP_API_KEY: string
}

class Environment {
    readonly baseUrl = process.env.REACT_APP_BASE_URL
    readonly apiKey = process.env.REACT_APP_API_KEY
    
    get token() { return localStorage.getItem('token') }
    set token(value : any) { localStorage.setItem('token', value);}
}

export const environment = new Environment()

import ImageBrief from "./imageBrief"

export default class ImagePage {
    page: number = 0
    pageCount: number = 0
    hasMore: boolean = false
    pictures: ImageBrief[] = []

    static parseJson(json: any): ImagePage {
        return Object.assign(new ImagePage(), json);
    }

}
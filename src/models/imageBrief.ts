export default class ImageBrief {
    id: string = ""
    cropped_picture: string = ""

    static parseJson(json: any): ImageBrief {
        return Object.assign(new ImageBrief(), json);
    }
}
import { HttpService } from "./httpService";
import ImagePage from "../models/imagePage";
import Image from "../models/image";

class ImageService extends HttpService {

    constructor(){
        super('images', ImagePage.parseJson)
    }
    
    getImagePage(page?: number) {
        return this.get<ImagePage>({params : { page : page || 1 } });
    }

    getImage(id: number) {
        return this.get<Image>({resourceId: id});
    }
}

export const imageService = new ImageService()

import { AngularFireStorage } from "angularfire2/storage";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

export class MenuItem {
    key: string;
    readonly  title: string;
    readonly  description: string;
    //Cost will never be calculated client side
    //Cost is for display purposes only
    readonly cost: number;
    readonly cooktime: number;
    readonly type: string;
    readonly imageURI: string;

    image : Observable<string>

    constructor(title: string, description: string, cost: number, _cooktime: number, type: string, imageURI?: string, afStorage?: AngularFireStorage){
        this.title = title;
        this.description = description;
        this.cost = cost;
        this.cooktime = _cooktime;
        this.type = type;
        if(imageURI != null){
            this.imageURI = imageURI;
            let ref = afStorage.ref(this.imageURI);
            this.image = ref.getDownloadURL();
        }
    }
}
export class MenuItem {
    readonly  title: string;
    readonly  description: string;
    //Cost will never be calculated client side
    //Cost is for display purposes only
    readonly cost: number;
    readonly cooktime: number;
    readonly type: string;

    constructor(title: string, description: string, cost: number, _cooktime: number, type: string){
        this.title = title;
        this.description = description;
        this.cost = cost;
        this.cooktime = _cooktime;
        this.type = type;
    }
}
export class Customer {
    name: string;
    telephone: string;
    constructor(name: string, telephone: string)
    {
        this.name = name;
        this.telephone = telephone;
    }
    setName(name:string){
        this.name = name;
    }

    setTelephone(telephone:string){
        this.telephone = telephone;
    }
}
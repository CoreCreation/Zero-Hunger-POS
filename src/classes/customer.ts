export class Customer {
    name: string;
    telephone: string;
    city : string; 
    district : string;
    street : string;
    number : string;
    constructor(name: string, telephone: string)
    {
        this.name = name;
        this.telephone = telephone;
    }
    construct(name:string, tele: string, city: string, district: string, street: string, number: string){
        this.name = name;
        this.telephone = tele;
        this.city = city;
        this.district = district;
        this.street = street;
        this.number = number;
    }
}
import { Customer } from './customer';
import { MenuItem } from './menuItem';
import { forEach } from '@firebase/util/dist/esm/src/obj';

export class Order{
    key: string;
    date: string;
    customer: Customer;
    orderItems: Array<MenuItem>;
    constructor(){
        this.orderItems = new Array<MenuItem>();
        this.customer = new Customer(null, null);
        //This should get called when the object is constructed for the first time
        //It should be overwritten everytime after by the construct function
        let date = new Date();
        this.date = date.toISOString();
    }
    construct(date:string, customer: Customer, orderItems:Array<MenuItem>)
    {
        this.date = date;
        this.customer = customer;
        this.orderItems = orderItems;
    }
    setCustomer(customer: Customer){
        this.customer = customer;
    }
    addItem(item: MenuItem){
        this.orderItems.push(item);
    }
    removeItem(item:MenuItem){
        let index;
        let count = 0;
        this.orderItems.forEach(element => {
            if(element.title === item.title)
            {
                index = count; 
            }
            count++;
        });
        if(index == null)
        {
            return;
        }
        this.orderItems.splice(index,1);
    }

    empty():boolean{
        if(this.orderItems.length == 0){
            return true;
        }
        return false;
    }

    getCount(itemTitle:string){
        //This provides a quick way to get the total of items on small orders
        //In a larger system the data needs to be flattened and tracked in a cleaner fashion
        let count = 0;
        this.orderItems.forEach(element => {
            if(element.title === itemTitle){
                count ++;
            }
        });
        return count;
    }

    getTotal(): number{
        let sum = 0;
        this.orderItems.forEach(item => {
            sum+=item.cost;
        });
        return sum;
    }
    //TODO This should return a string which is logged by the caller
    logItems(){
        console.log("Current Orders");
        this.orderItems.forEach(element => {
            console.log(element.title);
        });
    }
}

export class FinishedOrder extends Order{

    finishDate:string;

    constructor(date:string, customer: Customer, orderItems:Array<MenuItem>){
        super();
        this.construct(date,customer,orderItems);
        let dateObject = new Date();
        this.finishDate = dateObject.toISOString();
    }

}
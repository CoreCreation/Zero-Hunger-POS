import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FinishOrderPage } from '../finish-order/finish-order'

import { MenuItem } from '../../classes/menuItem';
import { Order } from '../../classes/order';
import { Customer } from '../../classes/customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';


/**
 * Generated class for the CustomerInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-information',
  templateUrl: 'customer-information.html',
})
export class CustomerInformationPage {
  currentOrder: Order;
  formGroup: FormGroup;
  method: string;

  //TODO ADD ADDRESS AND pick up or Delivery or eat in

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      tele: new FormControl('', [ Validators.pattern('[0-9]{10}'), Validators.required ]),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      method: new FormControl('', Validators.required)
    });  
    this.currentOrder = navParams.data;
  }

  nextPageClick(method:string, name:string, tele: string, city: string, street: string, number: string){
    if(this.validateForm(method, name, tele, city, street, number)){
      this.pushFinishOrderPage();
    }
  }

  pushFinishOrderPage(){
    this.navCtrl.push(FinishOrderPage, this.currentOrder);
  }

  validateForm(method:string, name:string, tele: string, city: string, street: string, number: string) : boolean{
    if(this.formGroup.status != "VALID"){
      return false;
    }
    //Fix the OOP design of this so that each object owns its own data and passes it to the right objects for management
    this.currentOrder.customer.construct(name, tele, city, street, number);
    this.currentOrder.setMethod(method);
    return true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerInformationPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FinishOrderPage } from '../finish-order/finish-order'

import { MenuItem, foodType } from '../../classes/menuItem';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      tele: new FormControl('', [ Validators.pattern('[0-9]{10}'), Validators.required ])
    });  
    this.currentOrder = navParams.data;
        //TODO Remove this Log
        this.currentOrder.logItems();
  }

  nextPageClick(name:string, tele:string){
    if(this.validateForm(name, tele)){
      this.pushFinishOrderPage();
    }else{
      //Alert Error
    }
  }

  pushFinishOrderPage(){
    this.navCtrl.push(FinishOrderPage, this.currentOrder);
  }

  validateForm(name:string, tele: string) : boolean{
    if(this.formGroup.status != "VALID"){
      return false;
    }
    //Fix the OOP design of this so that each object owns its own data and passes it to the right objects for management
    this.currentOrder.customer.setName(name);
    this.currentOrder.customer.setTelephone(tele);
    return true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerInformationPage');
  }

}

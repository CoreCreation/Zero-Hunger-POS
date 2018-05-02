import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Order } from '../../classes/order';
import { Customer } from '../../classes/customer';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
//Pages
import { OrderFinishPage } from '../order-finish/order-finish';

/**
 * Generated class for the FinishOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finish-order',
  templateUrl: 'finish-order.html',
})
export class FinishOrderPage {

  currentOrder: Order;
  dbConnection: AngularFireDatabase;

  constructor(public navCtrl: NavController, public navParams: NavParams, afDatabase: AngularFireDatabase) {
    this.dbConnection = afDatabase;
    this.currentOrder = navParams.data;
  }

  saveOrder(){
    let key = this.dbConnection.list('orders').push(this.currentOrder).key;
    //TODO Make this go to a success page
    this.navCtrl.push(OrderFinishPage, {'key': key});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinishOrderPage');
  }

}

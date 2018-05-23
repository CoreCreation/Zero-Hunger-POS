import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Order, FinishedOrder } from '../../classes/order';
import { Customer } from '../../classes/customer';
import { MenuItem } from '../../classes/menuItem';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the CurrentOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-current-order',
  templateUrl: 'current-order.html',
})
export class CurrentOrderPage {
  afDatabase: AngularFireDatabase
  order: Order;
  msgText: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, afDatabase: AngularFireDatabase, public alertCtrl: AlertController) {
    this.afDatabase = afDatabase;
    this.order = this.navParams.data;
    //this.key = this.navParams.get('key');
    this.msgText = "";
  }
  
  finishOrder(order: Order){
    this.afDatabase.database.ref("/orders/" + this.order.key + "/status").set("Finished");
    this.afDatabase.list<Order>('/completedOrders').push(new FinishedOrder(order.date, order.customer, order.orderItems));
    this.afDatabase.list<Order>('/orders').remove(order.key);
    this.navCtrl.popToRoot();
  }

  deleteOrder(order){
    let alert= this.alertCtrl.create({
      title: "Delete this Order?",
      buttons: [
        {
          text:"No",
          handler: () =>
          {
            return;
          }
        },
        {
          text:"Yes",
          handler: () =>
          {

            this.afDatabase.list<Order>('/orders').remove(order.key);
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
    
  }

  sendMsg(){
    this.afDatabase.database.ref("/orders/" + this.order.key + "/message").set(this.msgText);
  }

  startOrder(){
    //The string will need to be changed to the translation code
    this.afDatabase.database.ref("/orders/" + this.order.key + "/status").set("Order Start");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentOrderPage');
  }

}

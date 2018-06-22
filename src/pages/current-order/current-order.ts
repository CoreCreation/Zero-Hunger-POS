import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Order, FinishedOrder } from '../../classes/order';
import { Customer } from '../../classes/customer';
import { MenuItem } from '../../classes/menuItem';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, afDatabase: AngularFireDatabase, public alertCtrl: AlertController, private afAuth: AngularFireAuth) {
    
    if(this.afAuth.authState == null)
    {
      this.navCtrl.setRoot(HomePage);
    }

    this.afDatabase = afDatabase;
    this.order = this.navParams.data;
    //this.key = this.navParams.get('key');
    this.msgText = "";
  }
  
  finishOrder(order: Order){
    this.afDatabase.database.ref("/orders/" + this.order.key + "/status").set("結束點餐");
    this.afDatabase.list<Order>('/completedOrders').push(new FinishedOrder(order.date, order.customer, order.orderItems));
    this.afDatabase.list<Order>('/orders').remove(order.key);
    this.navCtrl.popToRoot();
  }

  deleteOrder(order){
    let alert= this.alertCtrl.create({
      title: "確定刪除餐點嗎？",
      buttons: [
        {
          text:"不要刪除",
          handler: () =>
          {
            return;
          }
        },
        {
          text:"確定",
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
    this.afDatabase.database.ref("/orders/" + this.order.key + "/status").set("開始製作餐點");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentOrderPage');
  }

}

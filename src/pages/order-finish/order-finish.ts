import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../classes/order';

/**
 * Generated class for the OrderFinishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-finish',
  templateUrl: 'order-finish.html',
})
export class OrderFinishPage {

  orderID: string;
  order : Observable<Order[]>;
  status: string;
  lastMSG: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {
    this.orderID = this.navParams.get('key');
    this.order = this.afDatabase.list<Order>('/orders', ref => ref.orderByKey().equalTo(this.orderID)).valueChanges();
    this.order.subscribe({next: order => {
      this.status = order[0].status;
      this.lastMSG = order[0].message;
    }});
  }

  returnHome()
  {
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderFinishPage');
  }

}

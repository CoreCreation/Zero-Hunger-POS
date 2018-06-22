import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Database
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
//Classes
import { Order } from '../../classes/order';
import { MenuItem } from '../../classes/menuItem';
//Pages
import { CurrentOrderPage } from '../current-order/current-order';
import { DataSnapshot } from '@firebase/database-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';


/**
 * Generated class for the AdminCurrentOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-current-orders',
  templateUrl: 'admin-current-orders.html',
  providers: [AngularFireAuth]
})
export class AdminCurrentOrdersPage {
  dbConnection: AngularFireDatabase;
  currentOrders: Observable<any[]>;
  constructor(public navCtrl: NavController, afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth) 
  {

    if(this.afAuth.authState == null)
    {
      this.navCtrl.setRoot(HomePage);
    }

    //Set up database connection
    this.dbConnection = afDatabase;
    //This binds the keys into the order object
    //order.key

    //This is being denied because the auth is not valid
    this.currentOrders = this.dbConnection.list<Order>('/orders').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }

  gotoOrder(order: Order){
    let fullOrder = new Order();
    fullOrder.construct(order.date,order.customer, order.orderItems);
    this.navCtrl.push(CurrentOrderPage, order);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminCurrentOrdersPage');
  }

}

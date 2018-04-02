import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CustomerInformationPage } from '../customer-information/customer-information';
import { MenuItem } from '../../classes/menuItem';
import { Order } from '../../classes/order';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  dbConnection: AngularFireDatabase;
  menuItems: Observable<MenuItem[]>;
  currentOrder: Order;
  constructor(public navCtrl: NavController, afDatabase: AngularFireDatabase) 
  {
    //Set up database connection
    this.dbConnection = afDatabase;
    //Set up and pull the menu items
    this.menuItems = this.dbConnection.list<MenuItem>('/menuItems').valueChanges();
    //Set up the blank order
    this.currentOrder = new Order();
  }
  //TODO Divide the Menu with a segment
  //TODO make Menu Items have a Modal pop up of description
  addToOrder(menuItem: MenuItem)
  {
    this.currentOrder.addItem(menuItem);
  }

  removeFromOrder(menuItem: MenuItem)
  {
    this.currentOrder.removeItem(menuItem);
  }

  pushCustomerInfoPage()
  {
    this.navCtrl.push(CustomerInformationPage, this.currentOrder);
  }

  printCurrentOrder(){
    this.currentOrder.logItems();
  }

}
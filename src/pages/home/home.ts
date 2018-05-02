import { Component } from '@angular/core';
import { NavController, Menu } from 'ionic-angular';
import { CustomerInformationPage } from '../customer-information/customer-information';
import { MenuItem } from '../../classes/menuItem';
import { Order } from '../../classes/order';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  dbConnection: AngularFireDatabase;
  menuItems: Observable<any[]>
  currentOrder: Order;
  constructor(public navCtrl: NavController, afDatabase: AngularFireDatabase, public afStorage: AngularFireStorage) 
  {
    //Set up database connection
    this.dbConnection = afDatabase;
    //Set up and pull the menu items
    this.menuItems = this.dbConnection.list<MenuItem>('/menuItems').snapshotChanges().map(items =>{ 
      return items.map(item => {
        if(item.payload.val().imageURI != (null || "")){
          return new MenuItem(item.payload.val().title, item.payload.val().description, item.payload.val().cost, item.payload.val().cooktime, item.payload.val().type, item.payload.val().imageURI, afStorage);
        }else{
          return new MenuItem(item.payload.val().title, item.payload.val().description, item.payload.val().cost, item.payload.val().cooktime, item.payload.val().type);
        }
      })
    });
    //Set up the blank order
    this.currentOrder = new Order();
  }
  //TODO Divide the Menu with a segment
  //TODO make Menu Items have a Modal pop up of description
  //TODO Fix the issue with the floating next button

  addToOrder(menuItem: MenuItem)
  {
    this.currentOrder.addItem(menuItem);
    console.log(menuItem);
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
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Classes
import { MenuItem} from '../../classes/menuItem';
import { Order } from '../../classes/order';
//Firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AdminMenuAddPage } from '../admin-menu-add/admin-menu-add';



/**
 * Generated class for the AdminMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-menu',
  templateUrl: 'admin-menu.html',
})
export class AdminMenuPage {

  dbConnection: AngularFireDatabase;
  menuItems: Observable<MenuItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {
    this.dbConnection = afDatabase;
    this.menuItems = this.dbConnection.list<MenuItem>('/menuItems').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }

  editMenuItem(menuItem: MenuItem){
    this.navCtrl.push(AdminMenuAddPage, menuItem);
  }

  addMenuItem(){
    this.navCtrl.push(AdminMenuAddPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminMenuPage');
  }

}

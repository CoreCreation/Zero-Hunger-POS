import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Auth
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//Pages
import { HomePage } from '../home/home';
import {AdminCurrentOrdersPage} from '../admin-current-orders/admin-current-orders';
import { AdminMenuPage } from '../admin-menu/admin-menu';

/**
 * Generated class for the AdminHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
  providers: [AngularFireAuth]
})
export class AdminHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth) {
    if(!this.afAuth.auth.currentUser)
    {
      this.navCtrl.setRoot(HomePage);
    }
  }

  gotoCurrentOrders()
  {
    this.navCtrl.push(AdminCurrentOrdersPage)
  }

  gotoMenu()
  {
    this.navCtrl.push(AdminMenuPage);
  }

  returnHome() {
    this.navCtrl.setRoot(HomePage);
  }

  logout()
  {
    this.afAuth.auth.signOut().then((wow)=>this.returnHome());
  }

}

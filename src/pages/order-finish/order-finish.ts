import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderFinishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-finish',
  templateUrl: 'order-finish.html',
})
export class OrderFinishPage {
  //This page could have been a generic page to display any text or image like a pop up
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  returnHome()
  {
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderFinishPage');
  }

}

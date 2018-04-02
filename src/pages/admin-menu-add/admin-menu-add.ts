import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { MenuItem } from '../../classes/menuItem';
import { Observable } from '@firebase/util';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the AdminMenuAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-menu-add',
  templateUrl: 'admin-menu-add.html',
})
export class AdminMenuAddPage {
  dbConnection: AngularFireDatabase;
  menuAdd: FormGroup;
  itemTitle:string;
  itemDesc: string;
  itemCost: number;
  itemCookTime: number;
  itemType: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase, public alertCtrl: AlertController) {
    this.dbConnection = afDatabase;

    this.menuAdd = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      cost: new FormControl('', Validators.required),
      cookTime: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
      
    });

    if(this.navParams.data != null){
      let menuItem:MenuItem = this.navParams.data;
      this.itemTitle = menuItem.title;
      this.itemDesc = menuItem.description;
      this.itemCost = menuItem.cost;
      this.itemCookTime = menuItem.cooktime;
      this.itemType = menuItem.type;
    }
    }

    save(title: string, desc: string, cost: number, cookTime: number, type: string){
      if(this.menuAdd.status != "VALID"){
        return false;
      }
      this.dbConnection.list("/menuItems").push(new MenuItem(title, desc, cost, cookTime, type));
      
      let alert = this.alertCtrl.create({
        title: "Item Saved",
        buttons: [{
          text:'ok',
         handler:()=>
        {
          this.navCtrl.popToRoot();
        }}]
      });

      alert.present();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminMenuAddPage');
  }

}

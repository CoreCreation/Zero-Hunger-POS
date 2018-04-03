import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { MenuItem } from '../../classes/menuItem';
import { Observable } from '@firebase/util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

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
  key: string;
  dbConnection: AngularFireDatabase;
  menuAdd: FormGroup;
  itemTitle:string;
  itemDesc: string;
  itemCost: number;
  itemCookTime: number;
  itemType: string;
  itemURI: string;
  file: any;
  uploadTask: AngularFireUploadTask;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase, public alertCtrl: AlertController, public afStor: AngularFireStorage) {
    if(this.navParams.data != null){
      let menuItem:MenuItem = this.navParams.data;
      this.key = menuItem.key;
      this.itemTitle = menuItem.title;
      this.itemDesc = menuItem.description;
      this.itemCost = menuItem.cost;
      this.itemCookTime = menuItem.cooktime;
      this.itemType = menuItem.type;
      this.itemURI = menuItem.imageURI;
    }else{
      this.itemTitle = "";
      this.itemDesc = "";
      this.itemCost = 0;
      this.itemCookTime = 0;
      this.itemType = "";
      this.itemURI = "";
    }

    this.dbConnection = afDatabase;

    this.menuAdd = new FormGroup({
      title: new FormControl(this.itemTitle, Validators.required),
      description: new FormControl(this.itemDesc, Validators.required),
      cost: new FormControl(this.itemCost, Validators.required),
      cookTime: new FormControl(this.itemCookTime, Validators.required),
      type: new FormControl(this.itemType, Validators.required),
      image: new FormControl(this.itemURI)
    });
    }

    save(title: string, desc: string, cost: number, cookTime: number, type: string){
      if(this.menuAdd.status != "VALID"){
        return false;
      }

      cost = Number.parseInt(cost.toString());
      cookTime = Number.parseInt(cookTime.toString());

      let item;
      if(this.itemURI != null || this.itemURI != ""){
        item = new MenuItem(title, desc, cost, cookTime, type, this.itemURI);
        console.log("saving with a URI" + this.itemURI);
      }
      else{
        item = new MenuItem(title, desc, cost, cookTime, type);
        console.log("saving without a URI");
      }
      if(this.key != null){
        this.dbConnection.list('/menuItems').update(this.key, item)
      } else {
        this.dbConnection.list("/menuItems").push(item);
      }
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

  upload(event){
    console.log("file selected)");
    this.file = event.target.files[0];
    this.itemURI = this.itemTitle.toLowerCase().replace(/\s+/g, '');
    this.uploadTask = this.afStor.upload(this.itemURI,this.file);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminMenuAddPage');
  }
  
  delete(){
    if(this.key != null || this.key != ""){
    this.dbConnection.list('/menuItems').remove(this.key);
    this.navCtrl.popToRoot();
    }
  }
}

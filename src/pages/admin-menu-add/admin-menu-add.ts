import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, DateTime } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { MenuItem } from '../../classes/menuItem';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the AdminMenuAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-admin-menu-add',
  templateUrl: 'admin-menu-add.html',
  providers: [AngularFireAuth]
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
  picture: Observable<string>;
  uploadTask: AngularFireUploadTask;
  //TODO When the image is deleted then readded it does not add an image
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public afDatabase: AngularFireDatabase, public alertCtrl: AlertController, 
    public afStor: AngularFireStorage, public afAuth: AngularFireAuth) {

    if(!this.afAuth.auth.currentUser)
    {
      this.navCtrl.setRoot(HomePage);
    }

    if(this.navParams.get('item') != false){
      let menuItem:MenuItem = this.navParams.data;
      this.key = menuItem.key;
      this.itemTitle = menuItem.title;
      this.itemDesc = menuItem.description;
      this.itemCost = menuItem.cost;
      this.itemCookTime = menuItem.cooktime;
      this.itemType = menuItem.type;
      this.itemURI = menuItem.imageURI;
      if(this.itemURI != (null || "")){
        this.picture = this.getPicURL(this.itemURI);
      }
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
      type: new FormControl(this.itemType, Validators.required)
    });
    }

    saveItemEndPage(title: string, desc: string, cost: number, cookTime: number, type: string){
      if(this.menuAdd.status != "VALID"){
        return false;
      }

      cost = Number.parseInt(cost.toString());
      cookTime = Number.parseInt(cookTime.toString());

      this.saveItem(title, desc, cost, cookTime, type);
      
      let alert = this.alertCtrl.create({
        title: "Item Saved",
        buttons: [{
          text:'ok',
         handler:()=>
        {
          this.navCtrl.pop();
        }}]
      });

      alert.present();
    }

  saveItem(title: string, desc: string, cost: number, cookTime: number, type: string){
    let item;
      if(this.itemURI != null || this.itemURI != ""){
        item = new MenuItem(title, desc, cost, cookTime, type, this.itemURI);
      }
      else{
        item = new MenuItem(title, desc, cost, cookTime, type);
      }
      if(this.key != null){
        this.dbConnection.list('/menuItems').update(this.key, item)
      } else {
        this.dbConnection.list("/menuItems").push(item);
      }
  } 
    
  upload(event){
    let date = new Date();
    this.file = event.target.files[0];
    this.itemURI = event.target.files[0].name.replace('.jpg','').toLowerCase().replace(/\s+/g, '')+date.getTime();
    this.afStor.upload(this.itemURI,this.file).then(data => {
     this.picture = this.getPicURL(this.itemURI);  
    });
  }


  getPicURL(URI: string){
    let ref = this.afStor.ref(URI);
    return ref.getDownloadURL();
  }

  deletePic(){
    //If this item exists on the server then the picture URI needs to be erased from there too
    this.afStor.ref(this.itemURI).delete();
    this.itemURI = "";
    this.picture = null;
    if(this.key != null){
      this.saveItem(this.itemTitle, this.itemDesc, this.itemCost, this.itemCookTime, this.itemType);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminMenuAddPage');
  }
  
  delete(){
    if(this.key != null || this.key != ""){
    if(this.itemURI != (null || "")){
      this.deletePic();
    }
    this.dbConnection.list('/menuItems').remove(this.key);
    this.navCtrl.popToRoot();
    }
  }
}

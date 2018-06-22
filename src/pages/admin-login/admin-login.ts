import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Forms
import { Validators, FormGroup, FormControl } from '@angular/forms';
//Auth
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//Pages
import { AdminHomePage } from '../admin-home/admin-home';
import { HomePage } from '../home/home';

/**
 * Generated class for the AdminLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-admin-login',
  templateUrl: 'admin-login.html',
  providers: [AngularFireAuth]
})
export class AdminLoginPage {
  loginForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email] ),
      password: new FormControl('', Validators.required)
    });  
    if(this.afAuth.auth.currentUser != null){
      this.navCtrl.setRoot(AdminHomePage);
    }
  }

  login(email:string, password: string){
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((val)=>{
      this.navCtrl.setRoot(AdminHomePage);
    }).catch((error)=>{
      alert("Try Again");
    });
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminLoginPage');
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CustomerInformationPage } from '../pages/customer-information/customer-information';
import { FinishOrderPage } from '../pages/finish-order/finish-order';
import { AdminLoginPage } from '../pages/admin-login/admin-login';
import { AdminHomePage } from '../pages/admin-home/admin-home';
import {AdminCurrentOrdersPage} from '../pages/admin-current-orders/admin-current-orders';
import { CurrentOrderPage } from '../pages/current-order/current-order';
import { OrderFinishPage } from '../pages/order-finish/order-finish';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseProvider } from '../providers/firebase/firebase';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AdminMenuPage } from '../pages/admin-menu/admin-menu';
import { AdminMenuAddPage } from '../pages/admin-menu-add/admin-menu-add';

// AF2 Settings
export const firebaseConfig = {
    apiKey: "APIKEY",
    authDomain: "DATA",
    databaseURL: "https://DATA",
    projectId: "DATA",
    storageBucket: "DATA.appspot.com",
    messagingSenderId: "DATA"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    //These have to leave for the build
    /*
    CustomerInformationPage,
    FinishOrderPage,
    AdminLoginPage,
    AdminHomePage,
    AdminCurrentOrdersPage,
    CurrentOrderPage,
    OrderFinishPage,
    AdminMenuPage,
    AdminMenuAddPage*/
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CustomerInformationPage,
    FinishOrderPage,
    AdminLoginPage,
    AdminHomePage,
    AdminCurrentOrdersPage,
    CurrentOrderPage,
    OrderFinishPage,
    AdminMenuPage,
    AdminMenuAddPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})
export class AppModule {}

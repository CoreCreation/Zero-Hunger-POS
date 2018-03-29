import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderFinishPage } from './order-finish';

@NgModule({
  declarations: [
    OrderFinishPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderFinishPage),
  ],
})
export class OrderFinishPageModule {}

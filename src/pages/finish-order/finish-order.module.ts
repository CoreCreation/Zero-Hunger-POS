import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinishOrderPage } from './finish-order';

@NgModule({
  declarations: [
    FinishOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(FinishOrderPage),
  ],
})
export class FinishOrderPageModule {}

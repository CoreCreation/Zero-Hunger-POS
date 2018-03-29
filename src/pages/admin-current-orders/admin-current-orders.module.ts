import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCurrentOrdersPage } from './admin-current-orders';

@NgModule({
  declarations: [
    AdminCurrentOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCurrentOrdersPage),
  ],
})
export class AdminCurrentOrdersPageModule {}

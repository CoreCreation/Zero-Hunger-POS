import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminMenuAddPage } from './admin-menu-add';

@NgModule({
  declarations: [
    AdminMenuAddPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminMenuAddPage),
  ],
})
export class AdminMenuAddPageModule {}

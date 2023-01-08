import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdduserComponent } from './curd/adduser/adduser.component';
import { EdituserComponent } from './curd/edituser/edituser.component';
import { UserListComponent } from './curd/user-list/user-list.component';

const routes: Routes = [
  {
    path:'',component:UserListComponent
  },
  {
    path:'add',component:AdduserComponent
  },
  {
    path:'edit/:id',component:EdituserComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

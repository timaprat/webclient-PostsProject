import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './posts/list/list.component';
import { LoginComponent } from './security/login.component';
import { NotAuthorisedComponent } from './security/not-authorised/not-authorised.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'posts/list',
    component: ListComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'notAuthorised',
    component: NotAuthorisedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

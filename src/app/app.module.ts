import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './posts/list/list.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { ListCommentsComponent } from './comments/list-comments/list-comments.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LoginComponent } from './security/login.component';
import { NotAuthorisedComponent } from './security/not-authorised/not-authorised.component';
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditPostComponent,
    AddPostComponent,
    ListCommentsComponent,
    ConfirmDialogComponent,
    LoginComponent,
    NotAuthorisedComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxDatatableModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

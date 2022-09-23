import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router' ;
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DisplayComponent } from './display/display.component';
import { HeaderComponent } from './header/header.component';
import { UserinputComponent } from './userinput/userinput.component';
import { UserdataService } from './userdata.service';

const appRoutes: Routes = [
  { path: './', component: UserinputComponent },
  { path: 'To_Do_List', component: DisplayComponent }

  ];  

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DisplayComponent,
    HeaderComponent,
    UserinputComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

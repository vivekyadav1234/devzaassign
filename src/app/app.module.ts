import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { NgDragDropModule } from 'ng-drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [   
    HttpClientModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgDragDropModule.forRoot(),
    BrowserAnimationsModule,
    DragDropModule
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
NgSelectModule
}

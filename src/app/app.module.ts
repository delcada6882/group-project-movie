import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { FormsModule } from '@angular/forms';
import { MovieSearchPageComponent } from './pages/movie-search-page/movie-search-page.component';
import { PopularPageComponent } from './pages/popular-page/popular-page.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [AppComponent, MoviePageComponent, MovieSearchPageComponent, PopularPageComponent, PaginatorComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }

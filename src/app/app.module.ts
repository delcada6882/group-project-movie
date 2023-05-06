import { ForgotPasswordComponent } from './components/modals/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthService } from './services/auth/auth.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MovieSearchPageComponent } from './pages/movie-search-page/movie-search-page.component';
import { PopularPageComponent } from './pages/popular-page/popular-page.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MoviePosterComponent } from './components/movie-poster/movie-poster.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { GenrePageComponent } from './pages/genre-page/genre-page.component';
import { MovieEndpointComponent } from './pages/movie-endpoint/movie-endpoint.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { VerifyEmailComponent } from './components/modals/verify-email/verify-email.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MovieSearchPageComponent,
    PopularPageComponent,
    PaginatorComponent,
    MoviePosterComponent,
    PageHeaderComponent,
    GenrePageComponent,
    MovieEndpointComponent,
    ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
		ForgotPasswordComponent,
		VerifyEmailComponent,
    
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireStorageModule,
		AngularFireDatabaseModule,
	],
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		AuthService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MovieSearchPageComponent } from './pages/movie-search-page/movie-search-page.component';
import { PopularPageComponent } from './pages/popular-page/popular-page.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { ForgotPasswordComponent } from './components/modals/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/modals/verify-email/verify-email.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { ForgotPasswordComponent } from './components/modals/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/modals/verify-email/verify-email.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full'
    },
    {
        path: 'movies/genre/:genreId',
        component: GenrePageComponent
    },
    {
        path: 'movies/films/:movieId',
        component: MovieEndpointComponent
    },
    {
        path: 'profile',
        component: LoginPageComponent,
    },
    {
		    path: 'TODO:RM-this-path',
		    component: ProfilePageComponent,
	  },
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'register',
        component: RegisterPageComponent,
    },
    {
        path: 'movies',
        component: MoviePageComponent
    },
    {
        path: "movieSearch",
        component: MovieSearchPageComponent
    },
    {
        path: 'movies/popular',
        component: PopularPageComponent
    },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'verify-email-address', component: VerifyEmailComponent },
    // {
    // 	path: '**',
    // 	redirectTo: 'folder/Inbox',
    // },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MovieSearchPageComponent } from './pages/movie-search-page/movie-search-page.component';
import { PopularPageComponent } from './pages/popular-page/popular-page.component';
import { GenrePageComponent } from './pages/genre-page/genre-page.component';
import { MovieEndpointComponent } from './pages/movie-endpoint/movie-endpoint.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full'
    },
    {
        path: 'folder/:id',
        loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
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
    // {
    // 	path: '**',
    // 	redirectTo: 'folder/Inbox',
    // },
    {
        path: 'movies/popular',
        component: PopularPageComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }

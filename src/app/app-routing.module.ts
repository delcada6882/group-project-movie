import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { MovieSearchPageComponent } from './pages/movie-search-page/movie-search-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'folder/inbox',
        pathMatch: 'full'
    },
    {
        path: 'folder/:id',
        loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
    },
    {
        path: 'movies',
        component: MoviePageComponent
    },
    {
        path: "movieSearch",
        component: MovieSearchPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

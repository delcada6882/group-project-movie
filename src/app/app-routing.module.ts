import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'folder/Inbox',
		pathMatch: 'full',
	},
	{
		path: 'folder/:id',
		loadChildren: () =>
			import('./folder/folder.module').then((m) => m.FolderPageModule),
	},
	// {
	// 	path: 'login',
	// 	loadChildren: () =>
	// 		import('./pages/login-page/login-page.module').then(
	// 			(m) => m.LoginPageModule
	// 		),
	// },
	{
		path: 'movies',
		component: MoviePageComponent,
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}

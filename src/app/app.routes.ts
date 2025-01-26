import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'DarkMovies - Home' },
  {
    path: '**',
    component: NotfoundComponent,
    title: 'DarkMovies - Page Not Found',
  },
];

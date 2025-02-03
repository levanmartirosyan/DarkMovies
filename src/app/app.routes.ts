import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'DarkMovies - Home' },
  {
    path: 'details/:media/:id',
    component: DetailsComponent,
    title: 'DarkMovies - Details',
  },
  {
    path: '**',
    component: NotfoundComponent,
    title: 'DarkMovies - Page Not Found',
  },
];

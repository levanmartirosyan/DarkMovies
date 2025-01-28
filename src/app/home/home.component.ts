import { Component } from '@angular/core';
import { TopComponent } from './top/top.component';
import { TrendingComponent } from './trending/trending.component';
import { TrailersComponent } from './trailers/trailers.component';
import { PopularComponent } from './popular/popular.component';
import { FreetowatchComponent } from './freetowatch/freetowatch.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopComponent,
    TrendingComponent,
    TrailersComponent,
    PopularComponent,
    FreetowatchComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

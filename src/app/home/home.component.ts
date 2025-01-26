import { Component } from '@angular/core';
import { TopComponent } from './top/top.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

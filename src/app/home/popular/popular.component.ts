import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss',
})
export class PopularComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.getPopularMovies('Streaming');
  }

  public selected: 'Streaming' | 'On TV' | 'For Rent' | 'In Theaters' =
    'Streaming';

  toggleSelection(option: 'Streaming' | 'On TV' | 'For Rent' | 'In Theaters') {
    this.selected = option;
    this.getPopularMovies(option);
  }

  public popular: any;
  getPopularMovies(day: string) {
    this.apiService.popularMovies(day).subscribe({
      next: (data: any) => {
        console.log(data);
        this.popular = data.results;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}

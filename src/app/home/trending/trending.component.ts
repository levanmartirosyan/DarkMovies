import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss',
})
export class TrendingComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTrendingMovies('day');
  }

  public selected: 'day' | 'week' = 'day';

  toggleSelection(option: 'day' | 'week') {
    this.selected = option;
    this.getTrendingMovies(option);
  }

  public trendings: any;
  getTrendingMovies(day: string) {
    this.apiService.trendingMovies(day).subscribe({
      next: (data: any) => {
        console.log(data);
        this.trendings = data.results;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}

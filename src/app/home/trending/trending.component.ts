import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss',
})
export class TrendingComponent implements OnInit {
  constructor(private apiService: ApiService, public router: Router) {}

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

  goToDetails(id: any, media: string) {
    this.router.navigate([`details/${media}/${id}`], {
      queryParams: {
        itemId: id,
        mediaType: media,
      },
    });
  }
}

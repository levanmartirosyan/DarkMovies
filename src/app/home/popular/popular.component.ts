import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss',
})
export class PopularComponent implements OnInit {
  constructor(private apiService: ApiService, public router: Router) {}
  ngOnInit(): void {
    this.getPopularMovies();
  }

  public selected: 'Movies' | 'Tv Shows' = 'Movies';

  toggleSelection(option: 'Movies' | 'Tv Shows') {
    this.selected = option;
    if (option == 'Movies') {
      this.getPopularMovies();
    } else {
      this.getPopularTv();
    }
  }

  public popular: any;
  getPopularMovies() {
    this.apiService.popularMovies().subscribe({
      next: (data: any) => {
        console.log(data);
        this.popular = data.results;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getPopularTv() {
    this.apiService.popularTv().subscribe({
      next: (data: any) => {
        console.log(data);
        this.popular = data.results;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  goToDetails(id: any) {
    this.router.navigate([`details/${this.selected}/${id}`], {
      queryParams: {
        itemId: id,
        mediaType: this.selected,
      },
    });
  }
}

import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-freetowatch',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './freetowatch.component.html',
  styleUrl: './freetowatch.component.scss',
})
export class FreetowatchComponent implements OnInit {
  constructor(private apiService: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.getTopRatedMovies();
  }

  public selected: 'Movies' | 'Tv Shows' = 'Movies';

  toggleSelection(option: 'Movies' | 'Tv Shows') {
    this.selected = option;
    if (option == 'Movies') {
      this.getTopRatedMovies();
    } else {
      this.getTopRatedTv();
    }
  }

  public topRated: any;
  getTopRatedMovies() {
    this.apiService.topRatedMovies().subscribe({
      next: (data: any) => {
        console.log(data);
        this.topRated = data.results;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getTopRatedTv() {
    this.apiService.topRatedTv().subscribe({
      next: (data: any) => {
        console.log(data);
        this.topRated = data.results;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  goToDetails(id: any, media: string, title: string) {
    this.router.navigate([`details/${media}/${title}/${id}`], {
      queryParams: {
        itemId: id,
        mediaType: media,
      },
    });
  }
}

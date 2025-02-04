import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule, NgClass } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-trailers',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './trailers.component.html',
  styleUrl: './trailers.component.scss',
})
export class TrailersComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getTrandingTrailers('day');
  }

  public selected: 'day' | 'week' = 'day';

  toggleSelection(option: 'day' | 'week') {
    this.selected = option;
    this.getTrandingTrailers(option);
  }

  public trailers: any;
  public trandings: any;
  public trandingIds: any[] = [];

  getTrandingTrailers(day: string) {
    this.apiService.trendingMovies(day).subscribe({
      next: (data: any) => {
        console.log(data);
        this.trandings = data.results;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  public modal: boolean = false;
  public url: any;
  getTrailerVideo(id: any) {
    console.log(id);
    if (id) {
      this.modal = !this.modal;
    }
    this.url = '';
    this.trandingIds = [];
    this.apiService.movieTrailers(id).subscribe({
      next: (data: any) => {
        this.trailers = data.results;
        console.log(this.trailers);

        this.trailers.forEach((item: any) => {
          if (item.type === 'Trailer') {
            this.trandingIds.push(item.key);
            console.log(this.trandingIds[0]);
          }
        });
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.youtube.com/embed/' + this.trandingIds[0]
        );
        console.log(this.url);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  toggleModal() {
    this.modal = !this.modal;
  }
}

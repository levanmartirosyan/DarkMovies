import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    public actR: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getDetailsData();
  }

  public itemId: any;
  public details: any = {};
  public hours: any;
  public minutes: any;
  getDetailsData() {
    this.actR.queryParams.subscribe((data: any) => {
      console.log(data);
      const mediaType = data.mediaType;
      console.log(mediaType);

      this.itemId = data.itemId;
      if (mediaType == 'movie' || mediaType == 'Movies') {
        this.apiService.movieDetails(this.itemId).subscribe({
          next: (data: any) => {
            console.log(data);
            this.details = data;
            this.hours = Math.floor(this.details.runtime / 60);
            this.minutes = this.details.runtime % 60;
            this.getMovieActors();
            this.getTrailerVideo(this.itemId, mediaType);
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      } else {
        this.apiService.tvDetails(this.itemId).subscribe({
          next: (data: any) => {
            console.log(data);
            this.details = data;
            this.getTvActors();
            this.getTrailerVideo(this.itemId, mediaType);
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      }
    });
  }

  public actors: any;
  public crew: any;
  public groupedCrew: any;
  public crewType: string = '';

  getMovieActors() {
    this.apiService.movieActors(this.itemId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.actors = data.cast;
        this.crew = data.crew;
        this.groupCrew('movie');
        console.log(this.groupedCrew);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getTvActors() {
    this.apiService.tvActors(this.itemId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.actors = data.cast;
        this.crew = data.crew;
        this.groupCrew('tv');
        console.log(this.groupedCrew);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  groupCrew(type: string) {
    this.crewType = type;
    this.groupedCrew = this.crew.reduce((acc: any, item: any) => {
      const existing = acc.find((person: any) => person.name === item.name);
      if (existing) {
        existing.jobs.push(item.job);
      } else {
        acc.push({ name: item.name, jobs: [item.job] });
      }
      return acc;
    }, []);
  }

  public imagesUrl: any;
  getImages() {
    this.apiService.movieImages(this.itemId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.imagesUrl = data.backdrops;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  public modal: boolean = false;
  public url: any;
  public trailers: any;
  public trandingIds: any[] = [];
  getTrailerVideo(id: any, mediaType: string) {
    this.url = '';
    if (mediaType == 'movie' || mediaType == 'Movies') {
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
    } else {
      this.apiService.tvTrailers(id).subscribe({
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
  }

  toggleModal() {
    this.modal = !this.modal;
  }
}

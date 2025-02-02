import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  constructor(private apiService: ApiService, public actR: ActivatedRoute) {}
  ngOnInit(): void {
    this.getDetailsData();
  }

  public itemId: any;
  public details: any;
  getDetailsData() {
    this.actR.queryParams.subscribe((data: any) => {
      console.log(data);
      const mediaType = data.mediaType;
      this.itemId = data.itemId;
      if (mediaType == 'movie') {
        this.apiService.movieDetails(this.itemId).subscribe({
          next: (data: any) => {
            console.log(data);
            this.details = data;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      } else {
        alert('Error, Unknown MediaType! :))))))');
      }
    });
  }
}

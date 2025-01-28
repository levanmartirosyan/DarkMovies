import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.dataIsTrue = false;
  }

  public burger: boolean = false;
  public search: boolean = false;
  public menuItem: string = '';
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  public searchQuery: string = '';

  toggleBurger() {
    this.burger = !this.burger;
    this.menuItem = '';
  }

  toggleMenuItem(category: string) {
    switch (this.menuItem) {
      case category:
        this.menuItem = '';
        break;
      default:
        this.menuItem = category;
        break;
    }
  }

  toggleSearch() {
    this.search = !this.search;
    this.searchInput.nativeElement.focus();
    this.getTrendingMovies();
  }

  public multiSearchResult: any;
  public dataIsTrue: boolean = false;
  multiSearch() {
    this.apiService.multiSearch(this.searchQuery).subscribe({
      next: (data: any) => {
        console.log(data);
        this.multiSearchResult = data.results;
        this.dataIsTrue = true;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    this.checkSearchInput();
  }

  public trendings: any;
  getTrendingMovies() {
    this.apiService.trendingMovies('day').subscribe({
      next: (data: any) => {
        console.log(data);
        this.trendings = data.results.slice(0, 10);
        this.dataIsTrue = false;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  checkSearchInput() {
    if (this.searchQuery === '' || this.searchQuery === null) {
      this.dataIsTrue = false;
      this.getTrendingMovies();
    } else {
      this.dataIsTrue = true;
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmI0MjBkNGQ1ZmFhYmNkZDA2OTBjZGRhZTYyZmUwMCIsIm5iZiI6MTczNjMzODQwMC4zNzEsInN1YiI6IjY3N2U2YmUwNjAxYWNmZTdiZDRlNjM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FkIOlQ-APePEKAZOSmRq5QSeCrvHQfWS86hgJp120fQ';

  primaryTranslations() {
    return this.http.get(
      'https://api.themoviedb.org/3/configuration/primary_translations',
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  multiSearch(keywords: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/search/multi?query=${keywords}&include_adult=false&include_video=false&language=en-US&page=1`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  trendingMovies(day: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/trending/movie/${day}?language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  popularMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  popularTv() {
    return this.http.get(
      'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  topRatedMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200',
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  topRatedTv() {
    return this.http.get(
      'https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200',
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  trailers(id: string) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  movieDetails(id: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  tvDetails(id: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}

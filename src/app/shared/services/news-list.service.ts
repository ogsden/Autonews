import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsListService {
  private readonly apiUrl = 'https://webapi.autodoc.ru/api/news';

  constructor(private http: HttpClient) {}

  public getNewsList(page: number = 1, limit: number = 12): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${page}/${limit}`)
      .pipe(map((response: any) => response.news));
  }
}

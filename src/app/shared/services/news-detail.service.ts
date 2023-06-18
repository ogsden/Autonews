import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsDetailService {
  private readonly apiUrl = 'https://webapi.autodoc.ru/api/news/item';

  constructor(private http: HttpClient) {}

  public getNewsDetail(newsUrl: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${newsUrl}`);
  }
}

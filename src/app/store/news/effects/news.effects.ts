import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { NewsDetailService } from 'src/app/shared/services/news-detail.service';
import { NewsListService } from 'src/app/shared/services/news-list.service';
import {
  loadNews,
  loadSingleNews,
  newsLoaded,
  singleNewsLoaded,
} from '../actions/news.actions';

@Injectable()
export class NewsEffects {
  constructor(
    private actions$: Actions,
    private newsListService: NewsListService,
    private newsDetailService: NewsDetailService
  ) {}

  public loadNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNews),
      concatMap((action) =>
        this.newsListService.getNewsList(action.page).pipe(
          map((newsList) => newsLoaded({ newsList })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  public loadSingleNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSingleNews),
      concatMap((action) =>
        this.newsDetailService.getNewsDetail(action.newsUrl).pipe(
          map((newsData) => singleNewsLoaded({ newsData })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}

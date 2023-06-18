import { createAction, props } from '@ngrx/store';
import { INews } from 'src/app/shared/interfaces/news.interface';

export const loadNews = createAction(
  '[News List] Load News',
  props<{ page: number }>()
);

export const newsLoaded = createAction(
  '[News] News loaded',
  props<{ newsList: INews[] }>()
);

export const loadSingleNews = createAction(
  '[News] Load Single News',
  props<{ newsUrl: string }>()
);

export const singleNewsLoaded = createAction(
  '[News] Single News Loaded',
  props<{ newsData: any }>()
);

export const clearNews = createAction('[News List Component] Clear News');

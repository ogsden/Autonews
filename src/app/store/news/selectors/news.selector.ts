import { createFeatureSelector, createSelector } from '@ngrx/store';
import { INewsState } from '../state/news.state';

export const state = createFeatureSelector<INewsState>('news');

export const getNews = createSelector(state, (state) => state.newsList);

export const selectSingleNews = createSelector(
  state,
  (state) => state.singleNews
);

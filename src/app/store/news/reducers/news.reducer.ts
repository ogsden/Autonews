import { createReducer, on } from '@ngrx/store';
import {
  clearNews,
  loadNews,
  newsLoaded,
  singleNewsLoaded,
} from '../actions/news.actions';
import { newsInitialState } from '../state/news.state';

export const newsReducer = createReducer(
  { ...newsInitialState, loading: false },
  on(loadNews, (state) => ({
    ...state,
  })),
  on(newsLoaded, (state, { newsList }) => ({
    ...state,
    newsList,
  })),
  on(clearNews, (state) => ({
    ...state,
    newsList: [],
  })),
  on(singleNewsLoaded, (state, { newsData }) => ({
    ...state,
    singleNews: newsData,
  }))
);

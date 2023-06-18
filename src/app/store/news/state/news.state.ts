import { INews } from 'src/app/shared/interfaces/news.interface';

export interface INewsState {
  newsList: INews[];
  singleNews: INews[];
}

export const newsInitialState: INewsState = {
  newsList: [],
  singleNews: [],
};

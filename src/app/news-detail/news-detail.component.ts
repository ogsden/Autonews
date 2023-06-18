import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadSingleNews } from '../store/news/actions/news.actions';
import { selectSingleNews } from '../store/news/selectors/news.selector';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.less'],
})
export class NewsDetailComponent implements OnInit {
  public news: any;
  private subscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private store$: Store) {}

  ngOnInit(): void {
    const newsUrl = this.route.snapshot.paramMap.get('id');

    if (newsUrl) {
      this.store$.dispatch(loadSingleNews({ newsUrl }));
    }

    this.subscription = this.store$
      .select(selectSingleNews)
      .subscribe((newsData) => {
        this.news = newsData;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

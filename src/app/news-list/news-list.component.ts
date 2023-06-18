import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { clearNews, loadNews } from '../store/news/actions/news.actions';
import { getNews } from '../store/news/selectors/news.selector';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.less'],
})
export class NewsListComponent implements OnInit, OnDestroy {
  private currentPage: number = 1;
  private selectedFileUrl: string | null = null;
  private isLoading = false;
  private newsSubscription: Subscription | null = null;
  public newsList: Array<any> = [];
  public isVisible = false;

  constructor(private store$: Store) {}

  public newsForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(null),
  });

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFileUrl = reader.result as string;
      };
    }
  }

  ngOnInit() {
    this.loadNews();
    this.newsSubscription = this.store$.select(getNews).subscribe((data) => {
      this.newsList = [...this.newsList, ...data];
      this.isLoading = false;
    });
    const storedNews = localStorage.getItem('addedNews');
    if (storedNews) {
      this.newsList.unshift(...JSON.parse(storedNews));
    }
  }

  ngOnDestroy() {
    this.store$.dispatch(clearNews());
    this.newsSubscription?.unsubscribe();
  }

  private loadNews(): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.store$.dispatch(loadNews({ page: this.currentPage }));
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      !this.isLoading &&
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
    ) {
      this.currentPage += 1;
      this.loadNews();
    }
  }

  public showModal(): void {
    this.isVisible = true;
  }

  public handleOk(): void {
    const newNewsItem = {
      title: this.newsForm.get('title')?.value,
      description: this.newsForm.get('description')?.value,
      titleImageUrl: this.selectedFileUrl,
      publishedDate: new Date().toISOString(),
    };

    const addedNews = JSON.parse(localStorage.getItem('addedNews') || '[]');

    addedNews.unshift(newNewsItem);

    localStorage.setItem('addedNews', JSON.stringify(addedNews));

    this.newsList.unshift(newNewsItem);

    this.newsForm.reset();
    this.selectedFileUrl = null;

    this.isVisible = false;
  }

  public handleCancel(): void {
    this.isVisible = false;
  }
}

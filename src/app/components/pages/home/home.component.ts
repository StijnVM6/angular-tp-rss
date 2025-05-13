import { Component, OnInit } from '@angular/core';
import { RssService } from '../../../services/rss.service';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../../ui/article/article.component';
import { Article } from '../../../types/types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ArticleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private rss: RssService) {}

  articles: Article[] = [];

  async ngOnInit(): Promise<void> {
    this.articles = await this.rss.getRssAsync();
  }
}

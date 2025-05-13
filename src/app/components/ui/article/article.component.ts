import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RssService } from '../../../services/rss.service';
import { Article } from '../../../types/types';

@Component({
  selector: 'app-article',
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit {
  subject: string = '';
  articles: Article[] = [];

  constructor(private route: ActivatedRoute, private rss: RssService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.subject = params.get('subjectName')!;
      this.fetchArticles();
    });
  }

  async fetchArticles(): Promise<void> {
    this.articles = await this.rss.getRssAsync(this.subject);
  }
}

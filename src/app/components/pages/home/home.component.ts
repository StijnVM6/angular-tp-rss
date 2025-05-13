import { Component, OnInit } from '@angular/core';
import { RssService } from '../../../services/rss.service';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../../ui/article/article.component';
import { Article, SubjectGroup } from '../../../types/types';
import { SUBJECT_GROUPS } from '../../../types/vars';

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
  subjectGroups: SubjectGroup[] = SUBJECT_GROUPS;

  async ngOnInit(): Promise<void> {
    this.articles = await this.rss.getRssAsync();
    console.log('groups', this.subjectGroups);
  }

  getLink(subject: string): string {
    return `${encodeURIComponent(subject)}`;
  }
}

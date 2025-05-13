import { Component, OnInit } from '@angular/core';
import { RssService } from '../../../services/rss.service';
import { CommonModule } from '@angular/common';
import { Article, SubjectGroup } from '../../../types/types';
import { SUBJECT_GROUPS } from '../../../types/vars';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private rss: RssService) {}

  articles: Article[] = [];
  subjectGroups: SubjectGroup[] = SUBJECT_GROUPS;

  // async ngOnInit(): Promise<void> {
  //   this.articles = await this.rss.getRssAsync();
  //   console.log('groups', this.subjectGroups);
  // }
}

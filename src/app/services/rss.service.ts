import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Article } from '../types/types';
import { parseRssToArticles } from '../utils/rss-parser.util';

@Injectable({
  providedIn: 'root',
})
export class RssService {
  private url =
    'https://api.allorigins.win/raw?url=http://www.lemonde.fr/biologie/rss_full.xml';

  constructor(private http: HttpClient) {}

  async getRssAsync(): Promise<Article[]> {
    const xml = await firstValueFrom(
      this.http.get(this.url, { responseType: 'text' })
    );
    return parseRssToArticles(xml);
  }
}

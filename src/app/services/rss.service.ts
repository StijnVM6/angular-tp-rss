import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { Article } from '../types/types';
import {
  parseRssToArticles,
  parseSubjectForUrl,
} from '../utils/rss-parser.util';

@Injectable({
  providedIn: 'root',
})
export class RssService {
  private url =
    'https://api.allorigins.win/raw?url=http://www.lemonde.fr/biologie/rss_full.xml';

  constructor(private http: HttpClient) {}

  async getRssAsync(subjectRaw: string): Promise<Article[]> {
    const subject = parseSubjectForUrl(subjectRaw);
    const firstUrl = `https://api.allorigins.win/raw?url=http://www.lemonde.fr/${subject}/rss_full.xml`;
    const secondUrl = `https://api.allorigins.win/raw?url=http://www.lemonde.fr/rss/${subject}.xml`;

    const isFirstUrlValid = await this.isUrlValid(firstUrl);
    const validUrl = isFirstUrlValid ? firstUrl : secondUrl;
    console.log('validUrl: \n', validUrl);

    const xml = await firstValueFrom(
      this.http.get(validUrl, { responseType: 'text' })
    );
    return parseRssToArticles(xml);
  }

  /*
  checkRssUrl(url: string): Observable<boolean> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
    */

  checkRssUrl(url: string): Observable<boolean> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((response: string) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response, 'text/xml');
        const items = xml.querySelectorAll('item');
        const hasParserError = xml.querySelector('parsererror');
        return !hasParserError && items.length > 0;
      }),
      catchError(() => of(false))
    );
  }

  private isUrlValid(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.checkRssUrl(url).subscribe((isValid) => resolve(isValid));
    });
  }
}

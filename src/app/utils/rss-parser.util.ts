import { Article } from '../types/types';

function formatDate(raw: string): string {
  if (!raw) return '';
  const dateData = raw.split(', ');
  const day = dateData![0];
  const dateRaw = dateData![1].split(' ');
  const dateDay = dateRaw[0];
  const dateMonth = dateRaw[1];
  const dateYear = dateRaw[2];
  return `${day}, ${dateDay} ${dateMonth} ${dateYear}`;
}

export function parseRssToArticles(xmlString: string): Article[] {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, 'text/xml');
  const items = Array.from(xml.querySelectorAll('item'));

  const articles = items.map((item) => {
    const mediaContent = item.getElementsByTagName('media:content')[0];

    const rawDate = item.querySelector('pubDate')?.textContent ?? '';
    const formattedDate = formatDate(rawDate);

    const obj = {
      title: item.querySelector('title')?.textContent ?? '',
      link: item.querySelector('link')?.textContent ?? '',
      pubDate: formattedDate,
      description: item.querySelector('description')?.textContent ?? '',
      guid: item.querySelector('guid')?.textContent ?? '',
      imageUrl: mediaContent?.getAttribute('url') ?? '',
    };

    return obj;
  });

  return articles;
}

export function parseSubjectForUrl(subjectRaw: string) {
  const cuts = ['a', 'le', 'la', 'un', 'une'];

  let words = subjectRaw.toLowerCase().split(' ');

  while (words.length > 1 && cuts.includes(words[0])) {
    words.shift();
  }

  let subject = words.join('_');
  subject = subject.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  console.log(`subject parse: "${subject}"`);
  return subject;
}

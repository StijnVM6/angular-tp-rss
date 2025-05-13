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
  const articles: Article[] = [];

  // Match <item> block
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const matches = xmlString.matchAll(itemRegex);

  for (const match of matches) {
    const itemXml = match[1];

    const extractTag = (tagName: string): string => {
      const tagRegex = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`);
      const result = itemXml.match(tagRegex);
      // console.log('extractTag: ', tagName, ': ', result);
      return result ? result[1].trim() : '';
    };

    const extractMediaUrl = (): string => {
      const mediaRegex = /<media:content[^>]+url="([^"]+)"/;
      const result = itemXml.match(mediaRegex);
      // console.log('extractMediaUrl', result);
      return result ? result[1] : '';
    };

    const rawTitle = extractTag('title')
      .replace('<![CDATA[', '')
      .replace(']]>', '');
    const rawLink = extractTag('link');
    const rawPubDate = extractTag('pubDate');
    const rawDescription = extractTag('description')
      .replace('<![CDATA[', '')
      .replace(']]>', '');
    const imageUrl = extractMediaUrl();

    const formattedDate = formatDate(rawPubDate);

    const article: Article = {
      title: rawTitle,
      link: rawLink,
      pubDate: formattedDate,
      description: rawDescription,
      imageUrl: imageUrl,
    };

    articles.push(article);
  }

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

import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ArticleComponent } from './components/ui/article/article.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'subject/:subjectName', component: ArticleComponent },
  { path: '**', redirectTo: '' },
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullPostComponent } from './full-post/full-post.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:slug', component: FullPostComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

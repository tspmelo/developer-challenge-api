import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Post } from '../post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public posts: Post[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.listPost().subscribe((posts) => {
      posts.sort((a, b) => {
        return (
          new Date(b.publish_date).getTime() -
          new Date(a.publish_date).getTime()
        );
      });
      this.posts = posts;
    });
  }
}

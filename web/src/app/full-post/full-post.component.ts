import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Comment } from '../comment';
import { Post } from '../post';
import { StateService } from '../state.service';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss'],
})
export class FullPostComponent implements OnInit {
  post?: Post;
  comments?: Comment[] = [];
  totalComments = 0;
  reply: number | undefined;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private stateService: StateService
  ) {
    this.stateService.replyData$.subscribe((reply) => (this.reply = reply));
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') || '';

    this.apiService.getPost(slug).subscribe((post) => {
      if (post) {
        this.post = post;

        this.apiService.listComment(post.id).subscribe((comments) => {
          this.totalComments = comments.length;

          const temp = {};
          const result: Comment[] = [];
          comments.forEach((element) => {
            element.children = [];
            temp[element.id] = element;
            if (element.parent_id) {
              temp[element.parent_id].children.push(element);
            } else {
              result.push(element);
            }
          });

          this.comments = result;
        });
      } else {
        this.notFound = true;
      }
    });
  }

  newComment(newComment: Comment): void {
    if (this.comments) {
      this.comments.push(newComment);
    } else {
      this.comments = [newComment];
    }
  }
}

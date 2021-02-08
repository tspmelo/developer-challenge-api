import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../comment';
import { StateService } from '../state.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: Comment;
  reply?: number;

  constructor(private stateService: StateService) {
    this.stateService.replyData$.subscribe((reply) => (this.reply = reply));
  }

  update(): void {
    this.stateService.update(this.comment?.id);
  }

  newComment(newComment: Comment): void {
    if (this.comment.children) {
      this.comment.children.push(newComment);
    } else {
      this.comment.children = [newComment];
    }
  }
}

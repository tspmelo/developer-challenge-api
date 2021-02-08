import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { StateService } from '../state.service';
import { Comment } from '../comment';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent {
  @Input() postId!: number;
  @Input() parentId?: number;
  @Output() newComment = new EventEmitter<Comment>();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  constructor(
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  submit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const comment: Partial<Comment> = {
        postId: this.postId,
        user: formValue.name,
        date: new Date().toISOString(),
        content: formValue.content,
        parent_id: this.parentId,
      };

      this.apiService.addComment(comment).subscribe((r) => {
        this.newComment.emit(r);
        this.form.reset();
        this.cancel();
      });
    }
  }

  cancel(): void {
    this.stateService.update(undefined);
  }

  hasError(elem: string): boolean {
    const input = this.form.get(elem);
    return !!input?.invalid && (input?.dirty || input?.touched);
  }
}

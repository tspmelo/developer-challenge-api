import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Comment } from './comment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public apiURL = 'http://localhost:9000';

  constructor(private httpClient: HttpClient) {}

  listPost(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.apiURL}/posts`);
  }

  getPost(slug: string): Observable<Post> {
    return this.httpClient
      .get<Post[]>(`${this.apiURL}/posts?slug=${slug}`)
      .pipe(map((p) => p?.[0]));
  }

  listComment(postId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      `${this.apiURL}/posts/${postId}/comments`
    );
  }

  addComment(comment: Partial<Comment>): Observable<Comment> {
    return this.httpClient.post<Comment>(
      `${this.apiURL}/posts/${comment.postId}/comments`,
      comment
    );
  }
}

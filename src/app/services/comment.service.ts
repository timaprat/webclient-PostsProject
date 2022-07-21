import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostModel } from '../models/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getCommentsByPost(post: PostModel) {
    return this.http
      .get<any>(`${environment.config.apiUrl}/posts/` + post.id + '/comments')
      .pipe(
        map((a) => {
          return a;
        })
      );
  }
}

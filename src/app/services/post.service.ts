import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get<[]>(`${environment.config.apiUrl}/posts`).pipe(
      map((a) => {
        return a;
      })
    );
  }

  get(id: number) {
    return this.http.get<any>(`${environment.config.apiUrl}/posts/` + id).pipe(
      map((a) => {
        return a;
      })
    );
  }

  put(post: PostModel): Observable<any> {
    return this.http
      .put(`${environment.config.apiUrl}/posts/` + post.id, post)
      .pipe(
        map((a) => {
          return a;
        })
      );
  }

  post(post: PostModel): Observable<any> {
    return this.http.post(`${environment.config.apiUrl}/posts`, post).pipe(
      map((a) => {
        return a;
      })
    );
  }

  delete(row: PostModel): Observable<any> {
    return this.http
      .delete<PostModel>(`${environment.config.apiUrl}/posts/` + row.id)
      .pipe();
  }
}

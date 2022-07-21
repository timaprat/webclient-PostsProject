import { Component, Input, OnInit } from '@angular/core';
import { CommentModel } from 'src/app/models/comment.model';
import { PostModel } from 'src/app/models/post.model';
import { CommentService } from 'src/app/services/comment.service';
import { NGXToastrService } from 'src/app/services/ngxtoastr.service';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss'],
  providers: [NGXToastrService],
})
export class ListCommentsComponent implements OnInit {
  @Input()
  post: PostModel;

  comments: CommentModel[] = [];
  commentsLoading: boolean = true;

  constructor(
    private commentService: CommentService,
    private toastService: NGXToastrService
  ) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getCommentsByPost(this.post).subscribe({
      next: (response) => {
        this.comments = response;
        this.toastService.typeSuccess('Comments', 'Data loaded successfully');
        this.commentsLoading = false;
      },
      error: (error) => {
        this.toastService.typeError('Error', 'Error loading classes: ', error);
        this.commentsLoading = false;
      },
    });
  }
}

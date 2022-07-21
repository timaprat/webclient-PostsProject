import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostModel } from 'src/app/models/post.model';
import { take } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import { NGXToastrService } from 'src/app/services/ngxtoastr.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  providers: [NGXToastrService],
})
export class AddPostComponent implements OnInit {
  post = new PostModel();

  constructor(
    public activeModal: NgbActiveModal,
    private _ngZone: NgZone,
    private postService: PostService,
    private toastService: NGXToastrService
  ) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {}
  onSubmit() {
    this.postService.post(this.post).subscribe({
      next: (response) => {
        this.toastService.typeSuccess('Posts', 'Data added successfully');
        this.activeModal.close(response);
      },
      error: (error) => {
        this.toastService.typeError('Error', 'Error loading classes: ', error);
      },
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onKeyUp(event: any) {
    event.target.value.length >= 399
      ? this.toastService.typeWarning(
          'Body:',
          'Less than 400 characters are allowed!'
        )
      : null;
  }
}

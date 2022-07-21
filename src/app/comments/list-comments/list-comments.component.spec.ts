import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentService } from 'src/app/services/comment.service';
import { NGXToastrService } from 'src/app/services/ngxtoastr.service';
import { ListCommentsComponent } from './list-comments.component';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { PostModel } from 'src/app/models/post.model';

describe('ListCommentsComponent', () => {
  let component: ListCommentsComponent;
  let fixture: ComponentFixture<ListCommentsComponent>;
  const post = new PostModel();
  

  beforeEach(async () => {
    // Declare shared variable
    let fakeCommentService: CommentService;
    const title = post.title;
    // Create fake
    fakeCommentService = jasmine.createSpyObj<CommentService>(
      'CommentService',
      {
        getCommentsByPost: of(post),
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ListCommentsComponent],
      imports: [ToastrModule.forRoot(), HttpClientTestingModule],
      providers: [{ provide: CommentService, useValue: fakeCommentService },NGXToastrService],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCommentsComponent);
    component = fixture.componentInstance;
    component.post = post;
    component.post.title = 'test';

    fixture.detectChanges();
  });

  
  it('shows the post title', () => {
    expect(component.post.title).toEqual('test');
  });

});

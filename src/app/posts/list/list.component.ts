import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { NGXToastrService } from 'src/app/services/ngxtoastr.service';
import { PostService } from 'src/app/services/post.service';
import { DatatableComponent, id, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { AddPostComponent } from '../add-post/add-post.component';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { ListCommentsComponent } from 'src/app/comments/list-comments/list-comments.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { SecurityService } from 'src/app/security/security.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [NGXToastrService],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  posts: PostModel[] = [];
  tempPosts: any[] = [];
  postsLoading: boolean = true;
  tableOffset = 0;
  SelectionType = SelectionType;
  selected: any[] = [];
  post = new PostModel();

  @ViewChild('myTable') myTable!: DatatableComponent;
  constructor(
    private toastService: NGXToastrService,
    private postService: PostService,
    private modal: NgbModal,
    private securityService: SecurityService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.getItem('bearerToken')
      ? this.loadAllPosts()
      : this.router.navigate(['notAuthorised']);
  }

  logout() {
    this.securityService.logout();
  }

  loadAllPosts() {
    this.postService.getAll().subscribe({
      next: (response) => {
        this.posts = response;
        this.tempPosts = [...response];
        this.postsLoading = false;

        this.toastService.typeSuccess('Posts', 'Data loaded successfully');
      },
      error: (error) => {
        this.toastService.typeError('Error', 'Error loading classes: ', error);
        this.postsLoading = false;
      },
    });
  }

  filterPosts(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempPosts.filter(function (d) {
      return d.body.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.posts = temp;
    // Whenever the filter changes, always go back to the first page
    this.tableOffset = 0;
  }
  onChange(event: any): void {
    this.tableOffset = event.offset;
  }

  onSelect({ selected }: any) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  modify(row: PostModel) {
    const modal = this.modal.open(EditPostComponent, {
      size: 'lg',
      backdrop: 'static', // disable modal from closing on click outside
      keyboard: false, // disable modal closing by keyboard esc
      centered: true,
    });
    modal.componentInstance.postData = row;
    modal.result.then(
      (result) => {
        this.loadAllPosts();
      },
      (reason) => {
        this.toastService.typeInfo('Post', 'No modification detected');
      }
    );
  }

  viewComments(row: PostModel) {
    const modal = this.modal.open(ListCommentsComponent, {
      size: 'lg',
    });
    modal.componentInstance.post = row;
  }

  addNew() {
    const modal = this.modal.open(AddPostComponent, {
      size: 'lg',
      backdrop: 'static', // disable modal from closing on click outside
      keyboard: false, // disable modal closing by keyboard esc
      centered: true,
    });
    modal.result.then((result) => {
      this.loadAllPosts();
    });
  }

  export() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.selected);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'PostsData.xlsx');
  }

  confirmDeletion(row: PostModel) {
    this.postsLoading = true;
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Deletion',
        message: 'Are you sure to delete the POST: ' + row.title + '?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deletePost(row);
      } else {
        this.postsLoading = false;
      }
    });
  }

  deletePost(row: PostModel) {
    this.postService.delete(row).subscribe({
      next: (response) => {
        this.toastService.typeSuccess('Posts', 'Data deleted successfully');
        this.postsLoading = false;
      },
      error: (error) => {
        this.toastService.typeError('Error', 'Error loading classes: ', error);
        this.postsLoading = false;
      },
    });
  }
}

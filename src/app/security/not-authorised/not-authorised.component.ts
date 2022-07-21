import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-not-authorised',
  templateUrl: './not-authorised.component.html',
  styleUrls: ['./not-authorised.component.scss']
})
export class NotAuthorisedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLoginPage(){
    this.router.navigate(['login']);
  }

}

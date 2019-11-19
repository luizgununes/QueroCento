import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { reject } from 'q';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' };
  submitted = false;
  data = undefined;

  constructor(
    public router: Router,
    public userData: UserData,
    public http: HttpClient
  ) {
    console.log('');
  }

  onSignup() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      var dados = { "username": this.signup.username, "password": this.signup.password }

      this.http.put('https://cors-anywhere.herokuapp.com/https://querocento.herokuapp.com/api/usuarios', dados)
        .subscribe(data => {
          this.data = data
          resolve(this.data);
          this.router.navigateByUrl('/app/tabs/schedule');
        },
          (error) => {
            reject(error.json());
          });
    });
  }
}
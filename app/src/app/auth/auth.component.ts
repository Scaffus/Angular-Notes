import { Component, OnInit } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  newUser: User = new User();

  constructor() { }

  ngOnInit(): void {
  }

  signUpWithEmailAndPassword() {
    var email = this.newUser.email;
    var password = this.newUser.password;

    console.log('email: ' + email, + ' password: ' + password)
    firebase.initializeApp(environment)

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      })
  }

}

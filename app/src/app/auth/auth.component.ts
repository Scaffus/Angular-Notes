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

  user: User = new User();

  constructor() { }

  ngOnInit(): void {
  }

  signUpWithEmailAndPassword() {
    var email = this.user.email; // 'mail@mail.com'; 
    var password = this.user.password; // 'passWord'; 

    if (email != '' && password.length >= 8) {
      firebase.initializeApp(environment.firebase)
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;

          console.log('Created user: ' + user)
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        })
    } else {
      console.log('Password must be at lease 8 characters, size of current ' + password.length)
    }
  }

  signInWithEmailPassword() {
    var email = this.user.email;
    var password = this.user.password;

    if (email != '' && password.length >= 8) {
      firebase.initializeApp(environment.firebase)
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;

          console.log('Signed in with mail: ' + user?.email)
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    } else {
      console.log('Password must be at lease 8 characters, size of current ' + password.length)
    }
  }
}

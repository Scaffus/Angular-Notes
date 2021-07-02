import { Component, OnInit } from '@angular/core';
import { Note } from '../models/Note';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";
import "firebase/auth";
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { timer } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

  // notes: Note[] = [];
  // notes$: Observable<Note[]> | undefined;
  newNote: Note = new Note();
  notes: Observable<any[]> | undefined;

  // New system
  noteItemsDoc: AngularFirestoreDocument<Note> | undefined;
  noteItems: Observable<any[]> | undefined;

  uid = '';
  // noteRef = ;
  // noteRef = this.afs.collection('notes');
  // noteRef = this.afs.collection('notes').doc(this.uid).collection('notes');
  // newNote = this.store.collection('note').valueChanges({ idField: 'id' });

  hideme = [false];
  hideNoteForm = true;

  editor_note: Note = new Note();
  showNoteEditor = false;
  edit_note: Note = new Note();

  showLoginUserForm = false;
  showCreateUserForm = false;
  user: User = new User();
  email:string | null = '';
  password:string | null = '';

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth,) {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        // show email in welcome message
        this.email = user.email;
        // call method that selects all items when user is authenticated
        this.selectItems(user.uid);
        this.uid = user.uid;
        this.notes = this.afs.collection('notes').doc(this.uid).collection('notes').valueChanges();
      }
    });
  }

  selectItems(uid: string) {
    // this.noteItemsDoc = this.afs.doc<Note>('notes\\'  + uid + '\\notes')
    this.noteItemsDoc = this.afs.collection('notes').doc<Note>();
  }

  ngOnInit(): void {}

  async addNote(uid: string) {
    if (this.newNote.title && this.newNote.content != '') {
      // this.notes.push(this.newNote);
      this.newNote.id = this.afs.createId();
      this.newNote.is_favorite = false;

      // this.afs.collection('notes').doc(this.uid).collection('notes').doc(this.newNote.id)
      this.afs.collection('notes').doc(this.uid).collection('notes').doc(this.newNote.id).set(Object.assign({}, this.newNote))
      .catch((error) => { alert(error); });

    }
  }

  async deleteNote(note: Note) {
    await this.afs.collection('notes').doc(this.uid).collection('notes').doc(note.id).delete()
    .catch((error) => { alert(error); });
    console.log(note.id)
  }

  openNoteEditor(note: Note) {
    this.editor_note = note;
    this.showNoteEditor = true;
  }

  async editNote(uid: string, note: Note) {
    await this.afs.collection('notes').doc(this.uid).collection('notes').doc(note.id).delete()
  }

  noteIsFavorite(note: Note) {
    return note.is_favorite;
  }

  debug(note: Note) {
    console.log(note.is_favorite);
  }

  // user login and handling part

  signUpWithEmailAndPassword() {
    var email = this.user.email; // 'mail@mail.com';
    var password = this.user.password; // 'passWord';

    if (email != '' && password.length >= 8) {
      // firebase.initializeApp(environment.firebase)
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
      // firebase.initializeApp(environment.firebase)
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

  async logoutUser() {
    await this.afAuth.signOut()
      .catch(function(error) { alert(error); });

    this.email = '';
    this.password = '';
    this.showCreateUserForm = false;
    this.showLoginUserForm = false;
  }

  showCreateUserFormF() {
    this.showCreateUserForm = true;
    this.showLoginUserForm = false;
  }

  showLoginUserFormF() {
    this.showLoginUserForm = true;
    this.showCreateUserForm = false;
  }

  cancelButton() {
    this.showCreateUserForm = false;
    this.showLoginUserForm = false;
  }
}

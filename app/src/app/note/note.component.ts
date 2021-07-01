import { Component, OnInit } from '@angular/core';
import { Note } from '../models/Note';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

  // notes: Note[] = [];
  notes$: Observable<Note[]> | undefined;
  newNote: Note = new Note();
  notes: Observable<any[]>;

  noteRef = this.fdb.collection('notes');
  // newNote = this.store.collection('note').valueChanges({ idField: 'id' });

  hideme = [false];
  hideNoteForm = true;

  constructor(private fdb: AngularFirestore) {
    this.notes = this.fdb.collection('notes').valueChanges();
  }

  ngOnInit(): void {}

  async addNote() {
    if (this.newNote.title && this.newNote.content != '') {
      // this.notes.push(this.newNote);
      this.newNote.id = this.fdb.createId();
      this.newNote.is_favorite = false;

      this.noteRef.doc(this.newNote.id)
      this.noteRef.doc(this.newNote.id).set(Object.assign({}, this.newNote))
      // .catch((error) => { alert(error); });

      console.log(this.newNote.id)
      // this.newNote = new Note();

      console.log(this.newNote);
    }
  }

  async deleteNote(note: Note) {
    await this.noteRef.doc(note.id).delete()
    .catch((error) => { alert(error); });
    console.log(note.id)
  }

  debug(note: Note) {
    console.log(note.is_favorite);
  } 

}


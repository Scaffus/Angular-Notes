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

  noteCollection = this.fdb.collection('notes');
  // newNote = this.store.collection('note').valueChanges({ idField: 'id' });

  hideme = [true];

  constructor(private fdb: AngularFirestore) {
    this.notes = this.fdb.collection('notes').valueChanges();
  }

  ngOnInit(): void {}

  addNote() {
    if (this.newNote.title || this.newNote.content != '') {
      // this.notes.push(this.newNote);
      this.newNote.id = this.fdb.createId();
      this.noteCollection.add(Object.assign({}, this.newNote));
      // this.newNote = new Note();

      console.log(this.newNote);
    }
  }

  async deleteNote(note: Note) {
    await this.fdb.collection('notes').doc(note.id).delete()
      .catch((error) => { alert(error); });
  }
}


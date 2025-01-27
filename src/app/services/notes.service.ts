import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';// Importa tu modelo de Note
import { Note } from '../store/note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor() {}

  getNotes(): Observable<Note[]> {
    // Lista estática de notas
    const notes: Note[] = [
      { id: 1, title: 'First Note', content: 'Content of the first note', archived: false, deleted: false, pinned: false, tags: [], user: null, updatedAt: new Date() },
      { id: 2, title: 'Second Note', content: 'Content of the second note', archived: false, deleted: false, pinned: false, tags: [], user: null, updatedAt: new Date() },
      { id: 3, title: 'Third Note', content: 'Content of the third note', archived: false, deleted: false, pinned: false, tags: [], user: null, updatedAt: new Date() },
    ];

    // Retorna las notas envueltas en un observable
    return of(notes);
  }
}

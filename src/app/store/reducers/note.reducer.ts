import { createReducer, on } from '@ngrx/store';
import { Note } from '../note.model';
import { addNote, loadNotesSuccess, removeNote, updateNote } from '../actions/note.action';
import { state } from '@angular/animations';

export interface NoteState {
  notes: Note[];
}

export const initialState: NoteState = {
  notes: [
      { id: 1, title: 'React Performance Optimization', content: 'Content of the first note', archived: false, deleted: false, pinned: false, tags: ["Dev", "React"], user: null, updatedAt: new Date() },
      { id: 2, title: 'Japan Travel Planning', content: 'Content of the second note', archived: false, deleted: false, pinned: false, tags: ["Travel", "Personal"], user: null, updatedAt: new Date() },
      { id: 3, title: 'Favorite Pasta Recipes', content: 'Content of the third note', archived: false, deleted: false, pinned: false, tags: ["Cooking", "Recipes"], user: null, updatedAt: new Date() },
      { id: 4, title: 'Weekly Workout Plan', content: 'Content of the third note', archived: false, deleted: false, pinned: false, tags: ["Dev", "React"], user: null, updatedAt: new Date() },
      { id: 5, title: 'Meal Prep Ideas', content: 'Content of the third note', archived: false, deleted: false, pinned: false, tags: ["Cooking","Health", "Recipes"], user: null, updatedAt: new Date() },
      { id: 6, title: 'Reading List', content: 'Content of the third note', archived: false, deleted: false, pinned: false, tags: ["Personal", "Dev"], user: null, updatedAt: new Date() },
      { id: 7, title: 'Fitness Goals 2025', content: 'Content of the third note', archived: false, deleted: false, pinned: false, tags: ["Fitness","Health", "Personal"], user: null, updatedAt: new Date() },
    ]
};

export const noteReducer = createReducer(
  initialState,
  on(loadNotesSuccess, (state, { notes }) => ({ ...state, notes })),
  on(addNote, (state, { note }) => ({ ...state, notes: [note, ...state.notes] })),
  on(removeNote, (state, { id }) => ({
    ...state,
    notes: state.notes.filter(note => note.id !== id),
  })),
  on(updateNote, (state, {id, note}) => ({
    ...state,
    notes: state.notes.map(noteDefault => {
      if(noteDefault.id !== id) return noteDefault
      return note
    })
  }))
);

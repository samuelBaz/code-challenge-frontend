import { createAction, props } from '@ngrx/store';
import { Note } from '../note.model';

export const loadNotes = createAction('[Note] Load Notes');

export const loadNotesSuccess = createAction(
  '[Note] Load Notes Success',
  props<{ notes: Note[] }>()
);

export const loadNotesFailure = createAction(
  '[Note] Load Notes Failure',
  props<{ error: any }>()
);

export const addNote = createAction(
  '[Note] Add Note',
  props<{ note: Note }>()
);

export const updateNote = createAction(
  '[Note] Update Note',
  props<{ id: number, note: Note }>()
);

export const removeNote = createAction(
  '[Note] Remove Note',
  props<{ id: number }>()
);

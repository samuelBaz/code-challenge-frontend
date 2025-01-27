import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NoteState } from '../reducers/note.reducer';

export const selectNoteState = createFeatureSelector<NoteState>('notes');

export const selectAllNotes = createSelector(
  selectNoteState,
  (state) => state.notes
);

export const selecFilterNotes = (filter: string) => createSelector(
  selectAllNotes,
  (notes) => notes.filter(note => !note.deleted && note.title.toLowerCase().includes(filter.toLowerCase()))
);

export const selectActiveNotes = createSelector(
  selectAllNotes,
  (notes) => notes.filter(note => !note.deleted && !note.archived)
);

export const selectActiveNotesWithFilter = (filter: string) => createSelector(
  selectAllNotes,
  (notes) => notes.filter(note => !note.deleted && !note.archived && (
    note.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || 
    note.tags.map(tag => tag.toLocaleLowerCase()).includes(filter.toLocaleLowerCase()) ||
    note.content.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  ))
);

export const selectArchivedNotes = createSelector(
  selectAllNotes,
  (notes) => notes.filter(note => !note.deleted && note.archived)
);

export const selectArchivedNotesWithFilter = (filter: string) => createSelector(
  selectAllNotes,
  (notes) => notes.filter(note => !note.deleted && note.archived && (
    note.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || 
    note.tags.map(tag => tag.toLocaleLowerCase()).includes(filter.toLocaleLowerCase()) ||
    note.content.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  ))
);

export const selectTagNotes = (tag: string) => createSelector(
  selectAllNotes,
  (notes) => notes.filter(note => !note.deleted && note.tags.includes(tag))
);

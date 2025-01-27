import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { NotesService } from '../../services/notes.service';
import { loadNotes, loadNotesFailure, loadNotesSuccess } from '../actions/note.action';

@Injectable()
export class NoteEffects {
  constructor(
    private actions$: Actions,
    private notesService: NotesService
  ) {}

  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotes),
      switchMap(() =>
        this.notesService.getNotes().pipe(
          map((notes) => loadNotesSuccess({ notes })), 
          catchError((error) => of(loadNotesFailure({ error })))
        )
      )
    )
  );
}

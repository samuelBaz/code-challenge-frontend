import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { ListboxModule } from 'primeng/listbox';
import { TagModule } from 'primeng/tag';
import { EditorModule } from 'primeng/editor';
import { Store } from '@ngrx/store';
import { BehaviorSubject, defaultIfEmpty, Observable } from 'rxjs';
import { Note } from '../../store/note.model';
import { selectActiveNotes, selectAllNotes, selectArchivedNotes, selectArchivedNotesWithFilter } from '../../store/selectors/note.selector';
import { addNote, loadNotes, removeNote, updateNote } from '../../store/actions/note.action';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-archived-notes',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, DividerModule, ListboxModule, TagModule, EditorModule, CommonModule, ToastModule, ConfirmDialog],
  providers: [ConfirmationService, MessageService],
  template: `
      <div class="grid grid-cols-4 layout-main">
        <div class="col-span-1 col-start-1 ... bg-white pt-4 pl-8 pr-4">
          <p-button label="Create New Note" icon="pi pi-plus" class="font-sans" styleClass="w-full" routerLink="/" size="large"></p-button>
          <span class="text-neutral-700 text-base font-sans font-normal">All your archived notes are stored here. You can restore or delete them anytime.</span>
          <div *ngIf="notes.length === 0" class="bg-neutral-100 p-2 border border-neutral-200 rounded-lg">
            <span class="text-neutral-700 text-base font-sans font-normal">No notes have been archived yet. Move notes here for safekeeping, or create a new note.</span>
          </div>
          <p-listbox *ngIf="notes.length > 0" [options]="notes" [(ngModel)]="noteSelected" optionLabel="name" styleClass="list-box" class="w-full md:w-56 mt-8">
              <ng-template let-note #item>
                  <div class="flex flex-col gap-2 w-full">
                      <span class="text-neutral-950 text-lg font-sans font-semibold">{{note.title}}</span>
                      <div class="flex flex-row">
                        <p-tag *ngFor="let tag of note.tags" severity="secondary" class="mr-2" value="{{tag}}" />
                      </div>
                      <span class="text-neutral-950 text-xs font-sans font-normal text-left">{{formatDate(note.updatedAt)}}</span>
                      <p-divider/>
                  </div>
              </ng-template>
          </p-listbox>
        </div>
        <div class="col-span-2 col-start-2 ... bg-white border-x border-x-neutral-200 pt-4 px-4">
          <div *ngIf="noteSelected()" class="flex flex-col">
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-sans font-bold mb-4" (click)="editTitle()">{{noteSelected()!.title}}</div>
            <div class="grid grid-cols-6">
              <div class="col-span-1 col-start-1 ...">
                <p-button icon="pi pi-tag" class="font-sans text-neutral-700" label="Tags" variant="text" severity="secondary" />
              </div>
              <div class="col-span-5 col-start-2 ... flex items-center">
                <span class="text-neutral-950 text-base font-sans font-normal">{{noteSelected()!.tags.join(", ")}}</span>
              </div>
            </div>
            <div class="grid grid-cols-6">
              <div class="col-span-1 col-start-1 ...">
                <p-button icon="pi pi-clock" class="font-sans text-neutral-700" label="Last edited" variant="text" severity="secondary" />
              </div>
              <div class="col-span-5 col-start-2 ... flex items-center">
                <span class="text-neutral-950 text-base font-sans font-normal">{{formatDate(noteSelected()!.updatedAt)}}</span>
              </div>
            </div>
            <p-divider/>
            <p-editor [(ngModel)]="text" [style]="{ height: '60vh' }" />
            <p-divider/>
            <div class="flex flex-row items-start">
              <p-button label="Save Note" class="font-sans text-neutral-950 mb-3 mr-4" size="large" (click)="saveNote(noteSelected()!)"></p-button>
              <p-button label="Cancel" class="font-sans text-neutral-950 mb-3" variant="outlined" severity="secondary" (click)="cancel()" size="large"></p-button>
            </div>
          </div>
        </div>
        <div class="col-span-1 col-start-4 ... bg-white pt-4 pl-4 pr-8">
          <p-toast position="bottom-right" severity="success"/>
          <div *ngIf="noteSelected()" class="flex flex-col">
            <p-confirmdialog position="center" />
            <p-button label="Restore Note" icon="pi pi-refresh" class="font-sans text-neutral-950 w-full mb-3" variant="outlined" severity="secondary" styleClass="w-full" (click)="restoreNote(noteSelected()!)" size="large"></p-button>
            <p-button label="Delete Note" icon="pi pi-trash" class="font-sans text-neutral-950 w-full" variant="outlined" severity="secondary" styleClass="w-full" (click)="confirmDelete($event)" size="large"></p-button>
          </div>
        </div>
      </div>
    `
})
export class ArchivedNotes {

  noteSelected = signal<Note | null>(null);
  text: string = ""

  editTitle() {
    console.log("Edit");
  }

  private store = inject(Store); // Inyectar el store

  private notesSubject = new BehaviorSubject<Note[]>([]);
  notes$: Observable<Note[] | any[]> = this.store.select(selectArchivedNotes);

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private route: ActivatedRoute) {
    this.store.dispatch(loadNotes());
    effect(() => {
      if(this.noteSelected() && this.noteSelected()!.content) this.text = this.noteSelected()!.content
    });
  }

  ngOnInit() {
    

    this.route.queryParams.subscribe(params => {
      const filter = params['filter'];
      this.store.select(filter? selectArchivedNotesWithFilter(filter) :selectArchivedNotes).subscribe((notes) => {
        this.notesSubject.next(notes || []); // Actualiza el BehaviorSubject
      });
    });
  }

  get notes(): Note[] {
    return this.notesSubject.getValue();
  }

  addNewNote() {
    const newNote: Note = { id: Math.random(), title: 'New Note', deleted: false, archived: false, content: '', pinned: false, tags: [], user: null, updatedAt: new Date() };
    this.store.dispatch(addNote({ note: newNote }));
  }

  saveNote(note: Note) {
    const noteUpdate  = {...note}
    noteUpdate.content = this.text
    this.store.dispatch(updateNote({ id: note.id, note: noteUpdate}));
  }

  cancel() {
    this.text = this.noteSelected()!.content
  }

  deleteNote(note: Note) {
    const noteUpdate  = {...note}
    noteUpdate.deleted = true
    this.store.dispatch(updateNote({ id: note.id, note: noteUpdate}));
    this.noteSelected.set(null)
  }

  restoreNote(note: Note) {
    const noteUpdate  = {...note}
    noteUpdate.archived = false
    this.store.dispatch(updateNote({ id: note.id, note: noteUpdate}));
    this.noteSelected.set(null)
  }

  formatDate(date: Date): string {
    return dayjs(date).format('DD MMM YYYY');
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to permanently delete this note? This action cannot be undone.',
        header: "Delete Note",
        closable: false,
        closeOnEscape: true,
        icon: 'pi pi-trash',
        rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Delete Note',
            severity: 'danger',
        },
        accept: () => {
          this.messageService.add({ severity: 'success', detail: 'Note permanently deleted.'})
          this.deleteNote(this.noteSelected()!)
        },
    });
  }
}

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
import { selectActiveNotes, selectActiveNotesWithFilter, selectAllNotes } from '../../store/selectors/note.selector';
import { addNote, loadNotes, removeNote, updateNote } from '../../store/actions/note.action';
import { CommonModule } from '@angular/common';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import dayjs from 'dayjs';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-all-notes',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, DividerModule, ListboxModule, TagModule, EditorModule, CommonModule, ToastModule, ConfirmDialog, ConfirmDialogModule],
  providers: [ConfirmationService, MessageService],
  template: `
      <div class="grid grid-cols-4 layout-main">
        <div class="col-span-1 col-start-1 ... bg-white pt-4 pl-8 pr-4">
          <p-button label="Create New Note" icon="pi pi-plus" class="font-sans" styleClass="w-full" (click)="newNote()" size="large"></p-button>
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
          <div *ngIf="noteSelected() && !newNoteFlag" class="flex flex-col">
            <div *ngIf="!editTitle" class="text-surface-900 dark:text-surface-0 text-3xl font-sans font-bold mb-4" (click)="setEditTitle()">{{editTitleText}}</div>
            <input *ngIf="editTitle" pInputText [(ngModel)]="editTitleText" class="text-6xl font-sans font-bold mb-2" type="text"  pSize="large" (keydown.enter)="onEnterPressedTitle()"/>
            <div class="grid grid-cols-6">
              <div class="col-span-1 col-start-1 ...">
                <p-button icon="pi pi-tag" class="font-sans text-neutral-700" label="Tags" variant="text" severity="secondary" />
              </div>
              <div class="col-span-5 col-start-2 ... flex items-center">
                <span *ngIf="!editTags" class="text-neutral-950 text-base font-sans font-normal" (click)="setEditTags()">{{editTagsText.length === 0 ? 'Add tags separated by commas (e.g. Work, Planning)' : editTagsText}}</span>
                <input *ngIf="editTags" pInputText [(ngModel)]="editTagsText" class="w-full text-6xl font-sans font-bold" type="text" (keydown.enter)="onEnterPressedTags()"/>
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
          <div *ngIf="newNoteFlag" class="flex flex-col">
            <div *ngIf="!editTitle" class="text-surface-900 dark:text-surface-0 text-3xl font-sans font-bold mb-4" (click)="setEditTitle()">{{editTitleText}}</div>
            <input *ngIf="editTitle" pInputText [(ngModel)]="editTitleText" class="text-6xl font-sans font-bold mb-2" type="text"  pSize="large" (keydown.enter)="onEnterPressedTitle()"/>
            <div class="grid grid-cols-6">
              <div class="col-span-1 col-start-1 ...">
                <p-button icon="pi pi-tag" class="font-sans text-neutral-700" label="Tags" variant="text" severity="secondary" />
              </div>
              <div class="col-span-5 col-start-2 ... flex items-center">
                <span *ngIf="!editTags" class="text-neutral-400 text-base font-sans font-normal" (click)="setEditTags()">{{editTagsText.length === 0 ? 'Add tags separated by commas (e.g. Work, Planning)' : editTagsText}}</span>
                <input *ngIf="editTags" pInputText [(ngModel)]="editTagsText" class="w-full text-6xl font-sans font-bold" type="text" (keydown.enter)="onEnterPressedTags()"/>
              </div>
            </div>
            <div class="grid grid-cols-6">
              <div class="col-span-1 col-start-1 ...">
                <p-button icon="pi pi-clock" class="font-sans text-neutral-700" label="Last edited" variant="text" severity="secondary" />
              </div>
              <div class="col-span-5 col-start-2 ... flex items-center">
                <span class="text-neutral-400 text-base font-sans font-normal">Not yet saved</span>
              </div>
            </div>
            <p-divider/>
            <p-editor [(ngModel)]="text" [style]="{ height: '60vh' }" />
            <p-divider/>
            <div class="flex flex-row items-start">
              <p-button label="Save Note" class="font-sans text-neutral-950 mb-3 mr-4" size="large" (click)="saveNewNote()"></p-button>
              <p-button label="Cancel" class="font-sans text-neutral-950 mb-3" variant="outlined" severity="secondary" (click)="cancelCreate()" size="large"></p-button>
            </div>
          </div>
        </div>
        <div class="col-span-1 col-start-4 ... bg-white pt-4 pl-4 pr-8">
          <p-toast position="bottom-right" severity="success"/>
          <div *ngIf="noteSelected()" class="flex flex-col">
            <p-confirmdialog position="center" />
            <p-button label="Archive Note" icon="pi pi-inbox" class="font-sans text-neutral-950 w-full mb-3" variant="outlined" severity="secondary" styleClass="w-full" (click)="confirmArchive($event)" size="large"></p-button>
            <p-button label="Delete Note" icon="pi pi-trash" class="font-sans text-neutral-950 w-full" variant="outlined" severity="secondary" styleClass="w-full" (click)="confirmDelete($event)" size="large"></p-button>
          </div>
        </div>
      </div>
    `
})
export class AllNotes {

  newNoteFlag: boolean = false;
  noteSelected = signal<Note | null>(null);
  text: string = ""
  editTitle: boolean = false;
  editTitleText: string = ""
  editTags: boolean = false
  editTagsText: string = ""


  private store = inject(Store); // Inyectar el store

  private notesSubject = new BehaviorSubject<Note[]>([]);
  notes$: Observable<Note[] | any[]> = this.store.select(selectActiveNotes);

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private route: ActivatedRoute) {
    this.store.dispatch(loadNotes());
    effect(() => {
      if(this.noteSelected() && this.noteSelected()!.content){
        this.text = this.noteSelected()!.content
        this.newNoteFlag = false
        this.editTitle = false
        this.editTitleText = this.noteSelected()!.title
        this.editTagsText = this.noteSelected()!.tags.join(", ")
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const filter = params['filter'];
      this.store.select(filter? selectActiveNotesWithFilter(filter) : selectActiveNotes).subscribe((notes) => {
        this.notesSubject.next(notes || []); // Actualiza el BehaviorSubject
      });
    });
  }

  get notes(): Note[] {
    return this.notesSubject.getValue();
  }

  saveNote(note: Note) {
    const noteUpdate  = {...note}
    noteUpdate.content = this.text
    noteUpdate.title = this.editTitleText
    noteUpdate.tags = this.editTagsText.split(", ")
    this.store.dispatch(updateNote({ id: note.id, note: noteUpdate}));
    this.newNoteFlag = false
    this.editTitle = false
    this.editTags = false
    this.noteSelected.set(null)
  }

  saveNewNote() {
    const note = {id: this.notes.length + 1, title: this.editTitleText, archived: false, content: this.text, deleted: false, pinned: false, tags: this.editTagsText.split(", "), updatedAt: new Date(), user: null} as Note
    this.store.dispatch(addNote({note}));
    this.newNoteFlag = false
    this.editTitle = false
    this.editTags = false
    this.noteSelected.set(null)
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

  archiveNote(note: Note) {
    const noteUpdate  = {...note}
    noteUpdate.archived = true
    this.store.dispatch(updateNote({ id: note.id, note: noteUpdate}));
    this.noteSelected.set(null)
  }

  formatDate(date: Date): string {
    return dayjs(date).format('DD MMM YYYY');
  }

  newNote() {
    this.newNoteFlag = true;
    this.noteSelected.set(null)
    this.editTitleText = "Enter a title..."
    this.text = "Start typing your note here…"
  }

  cancelCreate() {
    this.newNoteFlag = false;
    this.editTitle = false;
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

  confirmArchive(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.',
        header: "Archive Note",
        closable: false,
        closeOnEscape: true,
        icon: 'pi pi-inbox',
        rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Archive Note',
            severity: 'primary',
        },
        accept: () => {
          this.messageService.add({ severity: 'success', detail: 'Note was archived.'})
          this.archiveNote(this.noteSelected()!)
        },
    });
  }

  
  setEditTitle(): void {
    this.editTitle = true;
  }
  
  setEditTags(): void {
    this.editTags = true;
  }

  onEnterPressedTitle() {
    this.editTitle = false;
  }

  onEnterPressedTags() {
    this.editTags = false;
  }
}

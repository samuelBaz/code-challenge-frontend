import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [FormsModule, ButtonModule, DividerModule, InputTextModule, EditorModule, CommonModule],
  template: `
    <div class="flex flex-col">
      <div *ngIf="!editTitle" class="text-3xl font-bold mb-4" (click)="setEditTitle()">{{ editTitleText }}</div>
      <input
        *ngIf="editTitle"
        pInputText
        [(ngModel)]="editTitleText"
        class="text-6xl font-bold mb-2"
        (keydown.enter)="onEnterPressedTitle()"
      />
      <div class="grid grid-cols-6">
        <div class="col-span-1">
          <p-button icon="pi pi-tag" label="Tags" variant="text" severity="secondary"></p-button>
        </div>
        <div class="col-span-5 flex items-center">
          <span
            *ngIf="!editTags"
            class="text-base font-normal"
            (click)="setEditTags()"
          >{{ editTagsText.length === 0 ? 'Add tags separated by commas' : editTagsText }}</span>
          <input
            *ngIf="editTags"
            pInputText
            [(ngModel)]="editTagsText"
            class="w-full text-base font-bold"
            (keydown.enter)="onEnterPressedTags()"
          />
        </div>
      </div>
      <p-divider></p-divider>
      <p-editor [(ngModel)]="text" [style]="{ height: '60vh' }"></p-editor>
      <p-divider></p-divider>
      <div class="flex flex-row items-start">
        <p-button
          label="Save Note"
          class="mr-4"
          (click)="saveNote.emit()"
          size="large"
        ></p-button>
        <p-button
          label="Cancel"
          variant="outlined"
          severity="secondary"
          (click)="cancel.emit()"
          size="large"
        ></p-button>
      </div>
    </div>
  `,
})
export class NoteEditor {
  @Input() editTitleText: string = 'Enter a title...';
  @Input() editTagsText: string = '';
  @Input() text: string = '';
  @Output() saveNote = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  editTitle = false;
  editTags = false;

  setEditTitle() {
    this.editTitle = true;
  }

  setEditTags() {
    this.editTags = true;
  }

  onEnterPressedTitle() {
    this.editTitle = false;
  }

  onEnterPressedTags() {
    this.editTags = false;
  }
}

import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-note-actions',
  standalone: true,
  imports: [ButtonModule, ConfirmDialogModule],
  template: `
    <p-confirmdialog></p-confirmdialog>
    <p-button
      label="Archive Note"
      icon="pi pi-inbox"
      class="w-full mb-3"
      (click)="archive.emit()"
    ></p-button>
    <p-button
      label="Delete Note"
      icon="pi pi-trash"
      class="w-full"
      (click)="delete.emit()"
    ></p-button>
  `,
})
export class NoteActions {
  @Output() archive = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}

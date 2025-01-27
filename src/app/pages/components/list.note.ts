import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { Note } from '../../store/note.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [ListboxModule, TagModule, DividerModule, FormsModule],
  template: `
    <p-listbox [options]="notes" [(ngModel)]="selectedNote" optionLabel="name" class="w-full mt-8">
      <ng-template let-note #item>
        <div class="flex flex-col gap-2">
          <span class="text-lg font-semibold">{{ note.title }}</span>
          <div class="flex">
            <p-tag
              *ngFor="let tag of note.tags"
              severity="secondary"
              class="mr-2"
              value="{{ tag }}"
            ></p-tag>
          </div>
          <span class="text-xs">{{ formatDate(note.updatedAt) }}</span>
          <p-divider></p-divider>
        </div>
      </ng-template>
    </p-listbox>
  `,
})
export class NoteList {
  @Input() notes: Note[] = [];
  @Input() selectedNote: Note | null = null;
  @Output() selectedNoteChange = new EventEmitter<Note | null>();

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}

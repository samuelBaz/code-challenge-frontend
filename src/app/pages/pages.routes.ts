import { Routes } from '@angular/router';
import { AllNotes } from './all-notes/all.notes';
import { ArchivedNotes } from './archived-notes/archived.notes';
import { TagNotes } from './tag-notes/tag.notes';

export default [
    { path: 'all-notes', component: AllNotes },
    { path: 'archived-notes', component: ArchivedNotes },
    { path: 'tag-notes/:tag', component: TagNotes },
    { path: '**', redirectTo: '/all-notes' }
] as Routes;

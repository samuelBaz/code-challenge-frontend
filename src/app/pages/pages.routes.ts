import { Routes } from '@angular/router';
import { Test } from './test/test';
import { AllNotes } from './all-notes/all.notes';
import { ArchivedNotes } from './archived-notes/archived.notes';
import { TagNotes } from './tag-notes/tag.notes';

export default [
    { path: 'test', component: Test },
    { path: 'all-notes', component: AllNotes },
    { path: 'archived-notes', component: ArchivedNotes },
    { path: 'tag-notes/:tag', component: TagNotes },
    { path: '**', redirectTo: '/all-notes' }
] as Routes;

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                items: [
                    { label: 'All Notes', icon: 'pi pi-fw pi-home', routerLink: ['/pages/all-notes'] },
                    { label: 'Archived Notes', icon: 'pi pi-fw pi-inbox', routerLink: ['/pages/archived-notes'] }
                ]
            },
            {
                label: 'Tags',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Cooking',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/tag-notes/Cooking']
                    },
                    {
                        label: 'Dev',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/tag-notes/Dev']
                    },
                    {
                        label: 'Fitness',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/tag-notes/Fitness']
                    },
                    {
                        label: 'Health',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/tag-notes/Health']
                    },
                    {
                        label: 'Personal',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/tag-notes/Personal']
                    },
                    {
                        label: 'React',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/tag-notes/React']
                    },
                    {
                        label: 'Recipes',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/tag-notes/Recipes']
                    },
                    {
                        label: 'Shopping',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/tag-notes/Shopping']
                    },
                    {
                        label: 'Travel',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/tag-notes/Travel']
                    },
                    {
                        label: 'TypeScript',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/tag-notes/TypeScript']
                    },
                ]
            },
        ];
    }
}

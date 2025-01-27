import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../service/layout.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, IconFieldModule, InputIconModule, FloatLabelModule, InputTextModule, FormsModule],
  template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <span class="text-netral-950 text-2xl font-sans font-bold">{{title}}</span>
        </div>

        <div class="flex f-row justify-center">
          <div class="layout-topbar-search mr-6">
            <p-floatlabel variant="in">
              <p-iconfield>
                <p-inputicon class="pi pi-search" />
                <input [(ngModel)]="filter" pInputText id="in_label" class="w-full" autocomplete="off" (keydown.enter)="onEnterPressed()" />
              </p-iconfield>
              <label for="in_label">Search by title, content, or tags…</label>
            </p-floatlabel>
          </div>
          <div class="layout-topbar-menu">
            <div class="layout-topbar-menu-content">
              <button type="button" class="layout-topbar-action">
                  <i class="pi pi-cog" style="font-size: 1.5rem"></i>
                  <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
    </div>`
})
export class AppTopbar {
  filter: string = '';
  currentRoute: string = '';
  title: string = '';
  private routeSubscription: Subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Actualizar la ruta cada vez que cambia
        this.currentRoute = this.router.url;
        if(this.currentRoute.includes("all-notes")){
          this.title = "All Notes"
        }
        if(this.currentRoute.includes("archived-notes")){
          this.title = "Archived Notes"
        }
        if(this.currentRoute.includes("tag-notes")){
          this.title = "Notes Tagged: "+ this.currentRoute.split("/")[3]
        }
      }
    });
  }

  onEnterPressed() {
    this.router.navigate([], {
      relativeTo: this.route, 
      queryParams: { filter: this.filter }
    });
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción cuando el componente se destruya
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}

// Main imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// UI Elements
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';

import { PdfViewerModule } from 'ng2-pdf-viewer';

// Components
import { DialogComponent } from './components/dialog/dialog.component';
import { DashboardModelComponent } from './components/dashboard-model/dashboard-model.component';
import { AlertComponent } from './components/alert/alert.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { CommissionePageComponent } from './components/commissione-page/commissione-page.component';

// Services
import { ToastrService } from './services/toastr/toastr.service';
import { DialogService } from './services/dialog/dialog.service';
import { DeviceService } from './services/device/device.service';

// Directives
import { MatColorDirective } from './directives/mat-color/mat-color.directive';
import { RoundedDirective } from './directives/rounded/rounded.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    DialogComponent,
    DashboardModelComponent,
    AlertComponent,
    MatColorDirective,
    RoundedDirective,
    CarouselComponent,
    DashboardHomeComponent,
    CommissionePageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PdfViewerModule,
    FontAwesomeModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatDividerModule,
    MatExpansionModule,
    MatStepperModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    FontAwesomeModule,
    DashboardModelComponent,
    AlertComponent,
    MatColorDirective,
    RoundedDirective,
    CarouselComponent,
    DashboardHomeComponent,
    CommissionePageComponent,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatDividerModule,
    MatExpansionModule,
    MatStepperModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [ToastrService, DialogService, DeviceService],
})
export class UiModule {}

export { DialogService, ToastrService };

// Main imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// UI Elements
import { UiModule } from '@csl/ui';

// Main page
import { DashboardComponent } from '@dashboard/dashboard.component';

// Sub-components
import { ProfileComponent } from '@dashboard/components/profile/profile.component';
import { CategoryComponent } from '@dashboard/components/category/category.component';
import { OrdersComponent } from '@dashboard/components/orders/orders.component';
import { CheckoutComponent } from '@dashboard/components/checkout/checkout.component';

// Pipes
import { PipesModule } from '@global/pipes/pipes.module';
import { OrientamentoComponent } from './components/orientamento/orientamento.component';
import { EventComponent } from './components/event/event.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    CategoryComponent,
    OrdersComponent,
    CheckoutComponent,
    OrientamentoComponent,
    EventComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    PipesModule,
  ],
})
export class DashboardModule {}

// Main imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Main page
import { DashboardComponent } from '@dashboard/dashboard.component';

// Sub-components
import { ProfileComponent } from '@dashboard/components/profile/profile.component';
import { CategoryComponent } from '@dashboard/components/category/category.component';
import { OrdersComponent } from '@dashboard/components/orders/orders.component';
import { CheckoutComponent } from '@dashboard/components/checkout/checkout.component';
import { CogeComponent } from '@dashboard/components/coge/coge.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { OrientamentoComponent } from '@dashboard/components/orientamento/orientamento.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: ProfileComponent },
      { path: 'orientamento', component: OrientamentoComponent },
      // { path: 'coge', component: CogeComponent },
      // { path: 'coge/create', component: CreateCourseComponent },
      // { path: 'orders', component: CategoryComponent },
      // { path: 'checkout', component: CategoryComponent },
      // { path: 'orders/gadgets', component: OrdersComponent },
      // { path: 'orders/photos', component: OrdersComponent },
      // { path: 'checkout/gadgets', component: CheckoutComponent },
      // { path: 'checkout/photos', component: CheckoutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

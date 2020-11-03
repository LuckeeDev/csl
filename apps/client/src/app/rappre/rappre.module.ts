// Main imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappreRoutingModule } from './rappre-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// UI Elements
import { UiModule } from '@csl/ui';

// Main page
import { RappreComponent } from '@rappre/rappre.component';

// Sub-components
import { RappreHomeComponent } from './components/rappre-home/rappre-home.component';
import { ManageCategoryComponent } from '@rappre/components/manage-category/manage-category.component';
import { CreateProductComponent } from '@rappre/components/create-product/create-product.component';

// Shared module
import { SharedModule } from '@shared/shared.module';

// Pipes
import { PipesModule } from '@global/pipes/pipes.module';

@NgModule({
  declarations: [
    RappreComponent,
    ManageCategoryComponent,
    CreateProductComponent,
    RappreHomeComponent,
  ],
  imports: [
    CommonModule,
    RappreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UiModule,
    PipesModule
  ],
})
export class RappreModule {}

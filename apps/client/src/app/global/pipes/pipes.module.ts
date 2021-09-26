import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryPipe } from './category/category.pipe';
import { RoleDescriptionPipe } from './roleDescription/role-description.pipe';
import { ProductNamePipe } from './productName/product-name.pipe';
import { ProductIdPipe } from './product-id/product-id.pipe';
import { CategoryToColorPipe } from './category-to-color/category-to-color.pipe';
import { CourseStatusPipe } from './course-status/course-status.pipe';

// TODO: move inside CoreModule
@NgModule({
  declarations: [
    CategoryPipe,
    RoleDescriptionPipe,
    ProductNamePipe,
    ProductIdPipe,
    CategoryToColorPipe,
    CourseStatusPipe,
  ],
  imports: [CommonModule],
  exports: [
    CategoryPipe,
    RoleDescriptionPipe,
    ProductNamePipe,
    ProductIdPipe,
    CategoryToColorPipe,
    CourseStatusPipe
  ],
})
export class PipesModule {}

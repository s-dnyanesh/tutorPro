import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoubtDeatilPage } from './doubt-deatil.page';

const routes: Routes = [
  {
    path: '',
    component: DoubtDeatilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoubtDeatilPageRoutingModule {}

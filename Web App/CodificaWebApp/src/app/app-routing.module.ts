import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CustomersDetailsComponent } from './components/customers-details/customers-details.component';
import { NewOrderComponent } from './components/new-order/new-order.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  },
  {
    path: 'home',
    component: CustomersComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'customers/:id/:name',
    component: CustomersDetailsComponent
  },
  {
    path: 'customers/newOrder',
    component: NewOrderComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

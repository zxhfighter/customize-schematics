/**
 * @file 路由模块
 * @author <%=user%>
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%=classify(name)%>FormComponent } from './form';
import { <%=classify(name)%>ListComponent } from './list';
import { <%=classify(name)%>ViewComponent } from './view';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: <%=classify(name)%>ListComponent },
    { path: 'form', component: <%=classify(name)%>FormComponent },
    { path: 'form/:id', component: <%=classify(name)%>FormComponent },
    { path: 'view/:id', component: <%=classify(name)%>ViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%= classify(name) %>RoutingModule { }

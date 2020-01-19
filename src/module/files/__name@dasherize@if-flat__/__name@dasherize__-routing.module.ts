/**
 * @file 路由模块
 * @author <%=user%>
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.for<%= routingScope %>(routes)],
    exports: [RouterModule]
})
export class <%= classify(name) %>RoutingModule { }

/**
 * @file 模块
 * @author <%=user%>
 */

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { <%= classify(name) %>RoutingModule } from './<%= dasherize(name) %>-routing.module';

import { <%=classify(name)%>Service } from './<%= dasherize(name) %>.service';

import { <%=classify(name)%>FormComponent } from './form';
import { <%=classify(name)%>ListComponent } from './list';
import { <%=classify(name)%>ViewComponent } from './view';

@NgModule({
    declarations: [
        <%=classify(name)%>FormComponent,
        <%=classify(name)%>ListComponent,
        <%=classify(name)%>ViewComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        <%= classify(name) %>RoutingModule
    ],
    providers: [
        <%=classify(name)%>Service
    ]
})
export class <%= classify(name) %>Module { }

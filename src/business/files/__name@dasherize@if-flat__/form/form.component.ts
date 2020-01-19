/**
 * @file 表单文件描述
 * @author <%=user%>
 */

import {
    OnInit,
    OnDestroy,
    Component,
    ChangeDetectionStrategy
} from '@angular/core';

import { <%=classify(name)%>Service } from './<%= dasherize(name) %>.service';

@Component({
    selector: '<%=selector%>-form',
    templateUrl: './form.component.tpl.html',
    styleUrls: ['./form.component.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%=classify(name)%>FormComponent implements OnInit, OnDestroy {

    constructor(
        private service: <%=classify(name)%>Service
    ) {

    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}

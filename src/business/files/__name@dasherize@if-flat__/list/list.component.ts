/**
 * @file 列表文件描述
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
    selector: '<%=selector%>-list',
    templateUrl: './list.component.tpl.html',
    styleUrls: ['./list.component.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%=classify(name)%>ListComponent implements OnInit, OnDestroy {

    constructor(
        private service: <%=classify(name)%>Service
    ) {

    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}

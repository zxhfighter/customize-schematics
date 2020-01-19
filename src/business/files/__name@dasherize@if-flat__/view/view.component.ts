/**
 * @file 查看文件描述
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
    selector: '<%=selector%>-view',
    templateUrl: './view.component.tpl.html',
    styleUrls: ['./view.component.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%=classify(name)%>ViewComponent implements OnInit, OnDestroy {

    constructor(
        private service: <%=classify(name)%>Service
    ) {

    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}

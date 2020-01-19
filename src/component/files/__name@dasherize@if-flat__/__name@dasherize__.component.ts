/**
 * @file 组件
 * @author <%=user%>
 */

import {
    OnInit,
    OnDestroy,
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: '<%=selector%>',
    templateUrl: './<%=dasherize(name)%>.component.tpl.html',
    styleUrls: ['./<%=dasherize(name)%>.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%=classify(name)%>Component implements OnInit, OnDestroy {

    constructor(private cd: ChangeDetectorRef) {

    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}

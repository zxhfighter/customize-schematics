/**
 * @file 指令
 * @author <%=user%>
 */

import {
    OnInit,
    Directive,
    OnDestroy,
    ElementRef
} from '@angular/core';

@Directive({
    selector: '[<%=name%>]'
})
export class <%=classify(name)%>Directive implements OnInit, OnDestroy {

    constructor(
        private _el: ElementRef
    ) {

    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}

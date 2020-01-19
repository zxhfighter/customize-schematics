/**
 * @file 管道
 * @author <%=user%>
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: '<%=dasherize(name)%>',
    pure: true
})
export class <%=classify(name)%>Pipe implements PipeTransform {

    transform(originValue: any, ...args: any[]) {
        return originValue;
    }
}

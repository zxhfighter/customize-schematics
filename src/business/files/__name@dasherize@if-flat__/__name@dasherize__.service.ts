/**
 * @file 服务
 * @author <%=user%>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '@common/service';

@Injectable()
export class <%=classify(name)%>Service {

    constructor(
        private http: HttpService
    ) { }

}

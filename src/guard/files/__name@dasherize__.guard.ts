/**
 * @file 路由守卫
 * @author <%=user%>
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// 路由守卫方法 canActivate 返回类型
type canActiveType = Observable<boolean> | Promise<boolean> | boolean;

@Injectable({
    // 自动注册到根模块
    providedIn: 'root'
})
export class <%= classify(name) %>Guard implements CanActivate {
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): canActiveType {
        return true;
    }
}

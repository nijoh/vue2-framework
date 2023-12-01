import { cloneDeep } from 'lodash';
import allRouters from "@/router/allRouters";
import baseRouters from '@/router/baseRouters.js';
function recursionMenu(allMenu, dynamicMenu) {
    let menuArr = [];
    let arr = cloneDeep(allMenu);
    arr.forEach((el) => {
        dynamicMenu.forEach((dynamicmenu) => {
            if (el.name === dynamicmenu.menuCode) {
                //判断是否有下一级
                if (el.children) {
                    //递归
                    el.children = recursionMenu(el.children, dynamicMenu);
                }
                menuArr.push(el);
            }
        })
    });
    return menuArr;
}
export default function compareMenu(dynamicMenu) {
    const menuArr = recursionMenu(allRouters, dynamicMenu);
    //合并路由
    console.log('全部路由', allRouters, '后端路由', dynamicMenu, "基础路由", baseRouters);
    let baseRouter = cloneDeep(baseRouters);
    baseRouter.children.push(...menuArr);
    console.log("合并后的菜单-----", baseRouters);
    return baseRouter;
}
import { cloneDeep } from 'lodash';
import allRouters from "@/router/allRouters";

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
export default function compareMenu(baseRouters, dynamicMenu) {
    console.log('全部路由', allRouters, '后端路由', dynamicMenu);
    const menuArr = recursionMenu(allRouters, dynamicMenu);
    //合并路由
    baseRouters.children.push(...menuArr);
    return baseRouters;
}
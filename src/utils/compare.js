import { cloneDeep } from 'lodash';
import allRouters from "@/router/allRouters";
import baseRouters from '@/router/baseRouters.js';

function recursionMenu(allMenu, dynamicMenu) {
    let menuArr = [];
    let arr = cloneDeep(allMenu);

    dynamicMenu.forEach(dy => {
        arr.forEach(el => {
            if (el.name === dy.menuCode) {
                if (el.children) {
                    el.children = recursionMenu(el.children, dy.children);
                }
                menuArr.push(el);
            }
        })
    })
    return menuArr;
}

export default function compareMenu(dynamicMenu) {
    console.log("allRouters----------------------", allRouters);
    console.log("dynamicMenu----------------------", dynamicMenu);
    const dymenu = recursionMenu(allRouters, dynamicMenu);
    let baseRouter = cloneDeep(baseRouters);
    baseRouter.children.push(...dymenu);
    console.log("合并后的菜单-----", baseRouter);
    return baseRouter;
}
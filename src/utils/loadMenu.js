import { cloneDeep } from 'lodash';

function recursionMenu(allMenu, dynamicMenu) {
    let menuArr = [];
    console.log('全部路由', allMenu, '后端路由', dynamicMenu);
    let arr = cloneDeep(allMenu);
    arr.children.forEach((el) => {
        dynamicMenu.forEach((dynamicmenu) => {
            if (el.name === dynamicmenu.menuCode) {
                //判断是否有下一级
                if (el.children) {
                    //递归
                    el.children = recursionMenu(el, dynamicMenu);
                }
                menuArr.push(el);
            }
        })
    });
    return menuArr;
}
export default function loadMenu(allMenu, dynamicMenu) {
    const menuArr = recursionMenu(allMenu, dynamicMenu);
    console.log("整合后路由", menuArr);
    debugger;
    return menuArr;
}
import React from 'react';
import {BrowserRouterDecorator, ReduxStoreProvaiderDecoratior} from "./ReduxStoreProvaiderDecoratior";
import App from "../app/App";


export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProvaiderDecoratior, BrowserRouterDecorator]
}

export const AppBaseExample = (props:any) => <App demo={true}/>


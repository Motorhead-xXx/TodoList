import React from 'react';
import {ReduxStoreProvaiderDecoratior} from "./ReduxStoreProvaiderDecoratior";
import App from "../app/App";


export default {
    title: 'Todolist/App',
    component: App,
   decorators: [ReduxStoreProvaiderDecoratior]
}

export const AppBaseExample = (props:any) => <App demo={true}/>


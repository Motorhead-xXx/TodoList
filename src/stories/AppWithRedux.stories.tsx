import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {ReduxStoreProvaiderDecoratior} from "./ReduxStoreProvaiderDecoratior";
import App from "../App";

export default {
    title: 'Todolist/App',
    component: App,
   decorators: [ReduxStoreProvaiderDecoratior]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App/>

export const AppRedux = Template.bind({});

AppRedux.args = {};

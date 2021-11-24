import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {AddItemForm} from "../components/AddItemFormPropsType/AddItemForm";

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: "callback"
        }
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
export const AddItemFormDisableExample = Template.bind({});

AddItemFormStory.args = {
    addItem: action("Button inside form clicked")
};

AddItemFormDisableExample.args = {
    disabled: true
}
import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../features/TodolistsList/Todolist/Task/Task";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


export default {
    title: 'Todolist/Task',
    component: Task,
    argsTypes: {},
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback = action("Status changed inside Task")
const onChangeTitleCallback = action("Title changed inside Task")
const removeTaskCallback = action("Remove changed inside Task")


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatusCallback: changeTaskStatusCallback,
    onChangeTitleCallback: onChangeTitleCallback,
    removeTaskCallback: removeTaskCallback,

}

export const TaskIsDoneStory = Template.bind({});
export const TaskIsNotDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    ...baseArgs,
    task: {id: "3", title: "tea", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },

};

TaskIsNotDoneStory.args = {
    ...baseArgs,
    task: {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
};


import {
    createTodolist, changeTodolistEntityStatus, changeTodolistFilter,
    FilterValuesType,
    removeTodolist,
    TodolistDomainType,
    todoListsReducer, updateTitleTodolist,
} from "../TodolistsList/todoListReducer";
import {v1} from "uuid";
import {RequestStatusType} from "../../app/appReduser";
import {TodolistType} from "../../api/todolist-api";

let todolistId1: string;
let todolistId2: string;
let startState: TodolistDomainType[]


beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: "idle"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodolist.fulfilled({todolistId: todolistId1}, 'requestId', todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolist: TodolistType = {
        title: 'New Todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }

    const endState = todoListsReducer(startState, createTodolist.fulfilled({todolist}, 'requestId', todolist.title))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("What to buy");
    expect(endState[2].filter).toBe("all");
    expect(endState[2].id).toBeDefined();
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    let payload = {todolistId: todolistId2, title: newTodolistTitle}
    const action = updateTitleTodolist.fulfilled(payload,"requestId", payload);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";
    const action = changeTodolistFilter({todolistId: todolistId2, filter: newFilter});

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = "loading";
    const action = changeTodolistEntityStatus({todolistId: todolistId2, status: newStatus});

    const endState = todoListsReducer(startState, action);
    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe('loading');
});

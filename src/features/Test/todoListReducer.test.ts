import {actionTodo, FilterValuesType, TodolistDomainType, todolistsReducer} from "../TodolistsList/todoListReducer";
import {v1} from "uuid";
import {RequestStatusType} from "../../app/app-reduser";

let todolistId1: string;
let todolistId2: string;
let startState: TodolistDomainType[]


beforeEach(()=> {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all",addedDate: '', order: 0,entityStatus:"idle"},
        {id: todolistId2, title: "What to buy", filter: "all",addedDate: '', order: 0,entityStatus:"idle"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, actionTodo.removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, actionTodo.addTodolistAC({id: todolistId2, title: "What to buy", addedDate: '', order: 0}))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("What to buy");
    expect(endState[2].filter).toBe("all");
    expect(endState[2].id).toBeDefined();
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";



    const action = actionTodo.changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";
    const action = actionTodo.changeTodolistFilterAC(todolistId2,newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = "loading";
    const action = actionTodo.changeTodolistEntityStatusAC(todolistId2,newStatus );

    const endState = todolistsReducer(startState, action);
    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe('loading');
});

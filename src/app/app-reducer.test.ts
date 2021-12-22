import {actionApp, AppInitialStateType, appReducer} from "./app-reduser";

let startState: AppInitialStateType;

beforeEach(() => {
    startState = {
        errorMessage: null,
        status: "loading",
        initialized: false,
    }
});

test('correct error message', () => {
    const endState = appReducer(startState, actionApp.setAppError('some error'))
    expect(endState.errorMessage).toBe('some error');
});

test('correct status should be set ', () => {
    const endState = appReducer(startState, actionApp.setAppStatus('loading'))
    expect(endState.status).toBe('loading');
});
import {appReducer, InitialStateType, setAppError, setAppStatus} from "../../app/appReduser";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        errorMessage: null,
        status: "loading",
        initialized: false,
    }
});

test('correct error message', () => {
    const endState = appReducer(startState, setAppError({error:'some error'}))
    expect(endState.errorMessage).toBe('some error');
});

test('correct status should be set ', () => {
    const endState = appReducer(startState, setAppStatus({status:'loading'}))
    expect(endState.status).toBe('loading');
});
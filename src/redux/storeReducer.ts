export type initialStateType = {
    state: string
}

const initialState = {
    state: ''
}

export const storeReducer = (state: initialStateType = initialState, action: any) => {
    switch (action) {
        case 'XXX':
            return {
                ...state
            }
        default:
            return state
    }
};
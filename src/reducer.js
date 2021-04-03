import * as types from './types'
const initialState = {
user:null,
}

const reducer=(state = initialState, { type, payload }) => {
    switch (type) {

    case types.SET_USER:
        return { ...state, user:payload }

    default:
        return state
    }
}
export default reducer;
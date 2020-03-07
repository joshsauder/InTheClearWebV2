import * as actions from '../actions/index'
import reducer from '../reducers/index'

describe('Login Redux', () => {

    let expected ={
        type: "LOGIN",
        payload: {
            id: "123",
            name: "user",
            paid: true
        }
    }

    let user = {
        id: "123",
        displayName: "user",
        paid: true
    }

    it('Test Action', () => {

        expect(actions.setLoginInfo(user)).toEqual(expected)
    })

    it('Test Reducer Initial State', () => {

        const initialState = {
            id: "",
            name: "",
            paid: ""
        }

        expect(reducer(undefined, {}).loginInfo).toEqual(initialState)
    })

    it('Test Reducer', () => {

        let action = actions.setLoginInfo(user)

        expect(reducer([], {...action}).loginInfo).toEqual(action.payload)
    })
})
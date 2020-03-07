import * as actions from '../actions/index'
import * as reducers from '../reducers/index'

describe('Login Redux', () => {
    it('Test Action', () => {

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

        expect(actions.setLoginInfo(user).toEqual(expected))
    })

    it('Test Reducer', () => {
        
    })
})
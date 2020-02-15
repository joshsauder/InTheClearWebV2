export const LOGIN = "LOGIN"

export const setLoginInfo = (user, token) => {
    return {
        type: LOGIN,
        payload: {
            id: user.id,
            name: user.displayName,
            token: token
        }
    }
}
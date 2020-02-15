export const LOGIN = "LOGIN"

export const setLoginInfo = (user) => {
    return {
        type: LOGIN,
        payload: {
            id: user.id,
            name: user.displayName,
            paid: user.paid
        }
    }
}
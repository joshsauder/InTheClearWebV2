import * as firebase from 'firebase';

export const options = {
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
    },
    signInFlow: 'popup',
    signInOptions :
    [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: ['email', 'profile']
        },
        {
            provider: 'apple.com',
            scopes: ["email", "name"]
        }
    ]
}
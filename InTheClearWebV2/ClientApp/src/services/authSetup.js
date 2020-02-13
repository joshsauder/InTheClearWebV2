import * as firebase from 'firebase';


export const getGoogleAuth = () => {
    let provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('email')
    provider.addScope('profile')
    return provider;
}

export const getAppleAuth = () => {
    let provider = new firebase.auth.OAuthProvider('apple.com')
    provider.addScope('email');
    provider.addScope('name');
    return provider;
}
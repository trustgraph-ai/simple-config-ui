
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import {
    getAuth, onAuthStateChanged, signInWithEmailAndPassword,
    createUserWithEmailAndPassword, sendEmailVerification
} from "firebase/auth";

const app = initializeApp(firebaseConfig);

export const logout = () => {
    const auth = getAuth();
    return auth.signOut().then(
        () => {
            console.log("Signed out");
        }
    ).catch(
        (error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error3", errorMessage);
        }
    )
}

export const onAuthStateChange = (fn) => {
    const auth = getAuth();
    onAuthStateChanged(
        auth,
        (user) => {
            console.log("AUTH STATE CHANGE>>", auth);
            if (user) {
                if (!user.emailVerified) {
                    fn("not-verified", user);
                } else {
                    fn("authenticated", user);
                }
            } else {
                fn("not-authenticated", user);
            }
        }
    )
};

export const signin = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password).then(
        (user) => {
        }
    ).catch(
        (error) => { console.log(error); }
    );
}

export const register = (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password).then(
        (user) => {
            return sendEmailVerification(auth.currentUser)
        }
    ).then(
        () => {
            console.log("Verification email sent");
        }
    ).catch(
        (error) => { console.log(error); }
    );
}

export const resendVerification = () => {
    const auth = getAuth();
    return sendEmailVerification(auth.currentUser).then(
        () => {
            console.log("Verification email sent");
        }
    ).catch(
        (error) => { console.log(error); }
    );
}


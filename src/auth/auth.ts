
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import {
    getAuth, onAuthStateChanged, signInWithEmailAndPassword,
    createUserWithEmailAndPassword, sendEmailVerification, updateProfile,
    sendPasswordResetEmail,
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
            console.log("Error:", error);
            throw `${error.code}: ${error.message}`;
        }
    )
}

export const onAuthStateChange = (fn) => {
    const auth = getAuth();
    onAuthStateChanged(
        auth,
        (user) => {
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
        (error) => {
            console.log("Error:", error.toString());
            throw `${error.code}: ${error.message}`;
        }
    );
}

export const register = (email, password, displayName?) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password).then(
        (user) => {
            return sendEmailVerification(auth.currentUser)
        }
    ).then(
        () => {
            if (displayName) {
                return updateProfile(
                    auth.currentUser, { displayName: displayName }
                );
            } else
                return null;
        }
    ).then(
        () => {
            console.log("Verification email sent");
        }
    ).catch(
        (error) => {
            console.log("Error:", error);
            throw `${error.code}: ${error.message}`;
        }
    );
}

export const resendVerification = () => {
    const auth = getAuth();
    return sendEmailVerification(auth.currentUser).then(
        () => {
            console.log("Verification email sent");
        }
    ).catch(
        (error) => {
            console.log("Error:", error);
            throw `${error.code}: ${error.message}`;
        }
    );
}

export const resetPassword = (email) => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email).then(
        () => {
            console.log("Verification email sent");
        }
    ).catch(
        (error) => {
            console.log("Error:", error);
            throw `${error.code}: ${error.message}`;
        }
    );
}


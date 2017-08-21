import { AuthMethods, AuthProvider, FirebaseUIAuthConfig, FirebaseUIModule, AuthProviderWithCustomConfig } from "firebaseui-angular";

export const FirebaseUi = {
    
    AuthConfig: {
        providers: [
            AuthProvider.Google,
            AuthProvider.Password,
            AuthProvider.Facebook,
            AuthProvider.Github,
            //AuthProvider.Phone,
            AuthProvider.Twitter
        ],
        method: AuthMethods.Redirect,
        signInSuccessUrl: "/",
        tos: "<link>"
    }
};

import React, {useState, useEffect, useMemo, useCallback} from 'react';
import { userService } from '../Services/userService';

const UserContext = React.createContext();

export const UserProvider = (props) => {

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(undefined);
    const [tokenVerified, setTokenVerified] = useState(false);

    useEffect(() => {
        const verifyTokenAsync = async () => {
            const lsToken = getToken();

            if(lsToken && !tokenVerified) {
                const { email, permits } = await userService.verifyToken(lsToken);
                if(email && permits) {
                    setUser({ email, permits });
                    setTokenAll(lsToken);
                }
                setTokenVerified(true);
            }
        }

        verifyTokenAsync();
    }, [token, tokenVerified])

    const setTokenAll = (newToken) => {
        if (newToken) {
            localStorage.setItem("token", newToken);
        }
        else {
            localStorage.removeItem("token");
        }
        setToken(newToken);
    };

    const login = useCallback((identifier, password)=> {
        const loginAsync = async () => {
            let status = false;
            try {
                const { token: tokenRes } = await userService.logIn(identifier, password);

                if(tokenRes) {
                    setTokenAll(tokenRes);
                    status = true;
                }
            
            } catch (error) {
                console.error(error);
                console.error("Error in login");
            } finally {
            
                return status;
            
            }
        };

        return loginAsync();
    }, [])

    const signup = useCallback((email, password, profilePic)=> {
        const signupAsync = async () => {
            let status = false;
            try {
                const response = await userService.signUp(email, password, profilePic);

                if(response != null) {
                    status = true;
                }
            
            } catch (error) {
                console.error(error);
                console.error("Error in login");
            } finally {
            
                return status;
            
            }
        };

        return signupAsync();
    }, [])

    const logout = useCallback(() => {
        setUser(undefined);
        setTokenAll(undefined);
    }, [])

    const value = useMemo(()=> ({
        token: token,
        user: user,
        signup: signup,
        login: login,
        logout: logout,
    }), [token, user, signup, login, logout]);

    return <UserContext.Provider value={value} {... props}/>;
}

export const useUserContext = () => {
    const context = React.useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext() isn't inside of UserProvider");
    }

    return context;
}

const getToken = () => localStorage.getItem("token");

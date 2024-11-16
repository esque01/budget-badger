import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


interface AuthContextProps {
    isAuthenticated: boolean;
    logout: () => void;
    setIsAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const storedAuthState = sessionStorage.getItem("isAuthenticated"); 
        if (storedAuthState === 'true') {
            setIsAuthenticated(true);
        }
        else {
            checkAuthStatus();
        }
    }, []);


    const checkAuthStatus = async() => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/check-auth', { withCredentials: true });
            if (response.data.isAuthenticated) {
                setIsAuthenticated(true);
                sessionStorage.setItem("isAuthenticated", "true");
            }
            else {
                setIsAuthenticated(false);
                sessionStorage.removeItem("isAuthenticated");
            }
        } 
        catch (error) {
            setIsAuthenticated(false);
            sessionStorage.removeItem("isAuthenticated");
        }
    };

    const logout = async() => {
        await axios.post('http://localhost:5000/api/v1/logout', {}, { withCredentials: true });
        setIsAuthenticated(false);
        sessionStorage.removeItem("isAuthenticated");
    }

    const authContextValue: AuthContextProps = { isAuthenticated, logout, setIsAuthenticated }

    return (
        <AuthContext.Provider value={authContextValue}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("UseAuth must be used within an AuthProvider");
    }
    return context;
}

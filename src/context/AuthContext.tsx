import { createContext, useContext, useEffect, useState } from "react";


interface AuthContextProps {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    refreshAuthToken?: () => Promise<void>;  
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const localToken: string | null = localStorage.getItem("authToken");
        if (localToken) {
            setToken(localToken);   
        }
    }, []);

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("authToken", newToken);
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem("authToken");
    }

    const authContextValue: AuthContextProps = { isAuthenticated: !!token, token, login, logout }

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

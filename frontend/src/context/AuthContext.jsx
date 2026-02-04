import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const logout = async () => {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
        await fetch(`${API_BASE_URL.replace('/api', '')}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        setUser(null);
    };

    // Check login status (session-based)
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
                const res = await fetch(`${API_BASE_URL.replace('/api', '')}/api/auth/me`, {
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    // 401 is expected when not logged in, don't log as error
                    setUser(null);
                }
            } catch (err) {
                // Network errors or other issues
                console.error("Auth check failed:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading,logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

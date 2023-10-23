import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [data, setData] = useState({});

    async function signIn({ email, password }) {
        try {
            const response = await api.post("/sessions", { email, password });
            const { user, token } = response.data;

            localStorage.setItem('@rocketnotes:user', JSON.stringify(user));
            localStorage.setItem('@rocketnotes:token', token);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({ user, token });
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Não foi possível realizar login");
            }
        }
    }

    function signOut() {
        localStorage.removeItem('@rocketnotes:user');
        localStorage.removeItem('@rocketnotes:token');
        setData({});
    }

    async function updateProfile({ user, avatarFile }) {
        try {
            if (avatarFile) {
                const fileUploadForm = new FormData();
                fileUploadForm.append('avatar', avatarFile);

                const avatarResponse = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = avatarResponse.data.avatar;
            }

            const response = await api.put("/users", user);

            if (response.data.message) {
                alert(response.data.message);
            }

            localStorage.setItem('@rocketnotes:user', JSON.stringify(user));
            setData({ user, token: data.token });
        } catch (err) {
            if (err.response && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Não foi possível atualizar o perfil");
            }
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('@rocketnotes:token');
        const userStored = localStorage.getItem('@rocketnotes:user');

        if (token && userStored && userStored !== "undefined") {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({ token, user: JSON.parse(userStored) });
        } else {
            setData({ user: null, token: null });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, user: data.user, signOut, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };

    const getState = ({ getStore, getActions, setStore }) => {
        return {
            store: {
                message: null,
            },
            actions: {

                login: async (email, password) => {
                    try {
                        const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email, password })
                        });

                        if (!response.ok) {
                            throw new Error('Error al iniciar sesión');
                        }

                        const tokenJson = await response.json();
                        localStorage.setItem('token', tokenJson.access_token);
                        console.log('Token recibido:', tokenJson.access_token);
                        return tokenJson;
                    } catch (error) {
                        console.error('Error en login:', error);
                    }
                },

                getUser: async () => {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        console.error('No hay token almacenado');
                        return null;
                    }

                    try {
                        const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        if (!response.ok) {
                            throw new Error('Error al obtener usuario');
                        }
                        const userJson = await response.json();
                        return userJson;
                    } catch (error) {
                        console.error('Error en getUser:', error);
                    }
                },

                handlerRegister: async (body) => {
                    try {
                        const response = await fetch(`${process.env.BACKEND_URL}api/signup`, {
                            method: 'POST',
                            body: JSON.stringify(body),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            console.error("Error en el registro:", errorData);
                            return false;
                        }

                        const registerJson = await response.json();
                        console.log("Usuario registrado:", registerJson);
                        return true;

                    } catch (error) {
                        console.error("Error inesperado en el registro:", error);
                        return false;
                    }
                },
                
                getMessage: async () => {
                    try {
                        const resp = await fetch(`${process.env.BACKEND_URL}/api/hello`);
                        if (!resp.ok) throw new Error('Error en getMessage');
                        const data = await resp.json();
                        setStore({ message: data.message });
                        return data;
                    } catch (error) {
                        console.error("Error loading message from backend:", error);
                    }
                },
            }
        };
    };

    export default getState;

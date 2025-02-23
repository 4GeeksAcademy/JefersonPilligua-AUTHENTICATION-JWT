import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Single = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remueve el token
        alert("Cierre de sesión exitoso, vuelva pronto");
        navigate("/");
    };

    return (
        <div className="text-center mt-5">
            <h2>Página Single</h2>
            <p>Contenido exclusivo para usuarios autenticados.</p>
            <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

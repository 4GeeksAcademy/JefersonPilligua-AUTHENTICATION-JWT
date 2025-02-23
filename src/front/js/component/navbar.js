import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitRegister = async (event) => {
    event.preventDefault();
    
    const response = await actions.handlerRegister({ email, password });
    
    if (response) {
      alert("Registro exitoso, ahora inicia sesión");
      
      // Limpiar los campos de entrada
      setEmail("");
      setPassword("");

      // Cerrar el modal utilizando la API de Bootstrap 5
      // Asegúrate de que bootstrap esté cargado globalmente (por ejemplo, window.bootstrap)
      const modalElement = document.getElementById("exampleModal");
      if (modalElement) {
        // Obtén la instancia del modal
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        // Si no existe una instancia, créala y ciérrala
        if (modalInstance) {
          modalInstance.hide();
        } else {
          // Crea una nueva instancia y ocúltala
          const newModalInstance = new window.bootstrap.Modal(modalElement);
          newModalInstance.hide();
        }
      }
      
      // Redirige a la página de login si lo deseas
      navigate("/");
    } else {
      alert("Error al registrar usuario");
    }
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Create Account
        </button>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create Account
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmitRegister} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// Estado para errores de validación en el login
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		(() => {
			'use strict'
			const forms = document.querySelectorAll('.needs-validation');
			Array.from(forms).forEach(form => {
				form.addEventListener('submit', event => {
					if (!form.checkValidity()) {
						event.preventDefault();
						event.stopPropagation();
					}
					form.classList.add('was-validated');
				}, false);
			});
		})();
	}, []);

	const handleLogin = async (evt) => {
		evt.preventDefault();
		// Reseteamos el error en cada intento
		setError(false);
		const response = await actions.login(email, password);
		if (response && response.access_token) {
			alert(`Bienvenido ${email}`);
			navigate("/single");
		} else {
			// Si ocurre un error, activamos el estado de error para mostrar los inputs en rojo
			setError(true);
			alert("Error al iniciar sesión, por favor revisa tus credenciales");
		}
	};

	return (
		<div className="text-center mt-5">
			<div className="container-fluid">
				<h2>Authentication JWT</h2>
				<div className="container border border-primary-subtle border-2 rounded p-5">
					<form onSubmit={handleLogin} className="row g-3 needs-validation" noValidate>
						<div className="form-floating mb-3">
							<input 
								type="email" 
								className={`form-control ${error ? "is-invalid" : ""}`} 
								id="floatingInput" 
								placeholder="name@example.com" 
								onChange={(evt) => setEmail(evt.target.value)} 
								value={email} 
								required
							/>
							<label htmlFor="floatingInput">Email address</label>
							{error && <div className="invalid-feedback">Verifica el email</div>}
						</div>
						<div className="form-floating">
							<input 
								type="password" 
								className={`form-control ${error ? "is-invalid" : ""}`} 
								id="floatingPassword" 
								placeholder="Password" 
								onChange={(evt) => setPassword(evt.target.value)} 
								value={password} 
								required
							/>
							<label htmlFor="floatingPassword">Password</label>
							{error && <div className="invalid-feedback">Verifica la contraseña</div>}
						</div>
						<div className="col-12">
							<button className="btn btn-primary text-uppercase" type="submit">Sign in</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

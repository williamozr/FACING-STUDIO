import React, { useState } from "react";
import logo from './imgs/logo.png'

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "decanatura2023" && password === "facing123") {
            props.onLogin();
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="login">
            <div className="logo-image">
                <img
                    src= {logo}
                    alt="Logo"
                    title="Logo"
                    width="200"
                    
                ></img>
            </div>
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    id="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block btn-large"
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
}

export default Login;

import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import { Link, Redirect } from 'react-router-dom';
import logo from './Logo.png';
import { signInUser } from '../api/AuthApi';
import { getGroupUsers } from '../api/GroupUserApi';

const LoginPage = ({ setLoginUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToNext, setRedirectToNext] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const loginUser = await signInUser(username, password);
            localStorage.setItem('loginUser', JSON.stringify(loginUser.data));
            console.log('Login successful:', loginUser.data);
            setRedirectToNext(true);
        } catch (error) {
            console.error('Login failed:', error);
            setError('Username or password is incorrect. Please try again.');
        }
    };

    if (redirectToNext) {
        return <Redirect to="/gamemode" />;
    }

    return (
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <section className="vh-100 vw-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-5 container">
                            <img src={logo} className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-xl-6 offset-xl-1">
                            <form>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="form3Example3">
                                        Username
                                    </label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="form3Example4"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="form3Example4">
                                        Password
                                    </label>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', backgroundColor: '#198754' }}
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                    <a href="http://localhost:5173/#/login">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-lg"
                                            style={{
                                                paddingLeft: '2.5rem',
                                                paddingRight: '2.5rem',
                                                margin: '10px',
                                                backgroundColor: '#198754',
                                            }}
                                        >
                                            Admin Login
                                        </button>
                                    </a>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account?{' '}
                                        <Link to="/signup" className="link-danger">
                                            Register
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-success">
                    <div className="text-white mb-3 mb-md-0">Copyright © 2024. All rights reserved.</div>
                    <div>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#!" className="text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;

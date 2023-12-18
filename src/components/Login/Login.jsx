import React, { useContext, useState } from 'react';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faLongArrowAltRight, faSquareCheck, faBox, faSquare, faGhost } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    const [error, setError] = useState()
    const { singIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    console.log(location)


    const from = location.state?.from?.pathname || '/'



    const handleLogin = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        singIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
                navigate(from, { replace: true })
            })
            .catch(error => {
                setError(error.message)
            })
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required placeholder='Enter Email' />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={showPassword ? "text" : "password"} name="password" id="password" required placeholder='Enter Password' />
                    
                    <p onClick={() => setShowPassword(!showPassword)}><small>
                        {
                            showPassword ? <>
                                <FontAwesomeIcon className='btn-show-hide-icon' icon={faSquareCheck} />
                                <span>Hide Password</span>
                            </>
                                :
                                <>
                                    <FontAwesomeIcon className='btn-show-hide-icon' icon={faSquare} />
                                    <span>Show Password</span>
                                </>
                        }
                    </small></p>

                </div>

                <p className='text-error'><small>{error}</small></p>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p>New to Ema-john? <Link className='link' to="/singup">Create New Account</Link></p>


            <div className='separator'>
                <p><hr /></p>
                <p><small>or</small></p>
                <p><hr /></p>

            </div>

            <div className="google-btn">
            <FontAwesomeIcon className='btn-google-icon' icon={faGhost} />
                <p>Continue With Google</p>
            </div>
        </div>
    );
};

export default Login;
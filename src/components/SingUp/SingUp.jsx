import React, { useContext, useState } from 'react';
import './SingUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const SingUp = () => {
    const [error, setError] = useState('')
    const { createUser } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)

    const handleSignUp = event => {
        event.preventDefault()

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm)

        setError('');
        if (password !== confirm) {
            setError('Your password did not match')
            return;
        }
        else if (password.length < 6) {
            setError('Password must be 6 characters or longer')
            return;
        }

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                form.reset()

            })
            .catch(error => {
                setError(error)
            })
    }



    return (
        <div className='form-container'>
            <h2 className='form-title'>Sing Up</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required placeholder='Enter Email' />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={showPassword ? "text" : "password"} name="password" id="password" required placeholder='Enter Password' />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Confirm Password</label>
                    <input type={showPassword ? "text" : "password"} name="confirm" id="confirm" required placeholder='Confirm Password' />

                    <p onClick={() => setShowPassword(!showPassword)}><small>
                        {
                            showPassword ? <>
                                <FontAwesomeIcon className='btn-clear-delete-icon' icon={faSquareCheck} />
                                <span>Hide Password</span>
                            </>
                                :
                                <>
                                    <FontAwesomeIcon className='btn-clear-delete-icon' icon={faSquare} />
                                    <span>Show Password</span>
                                </>
                        }
                    </small></p>

                </div>

                <input className='btn-submit' type="submit" value="Sing Up" />
            </form>
            <p>Already have an account?<Link className='link' to="/login"> Login</Link></p>

            <p className='text-error'><small>{error}</small></p>

        </div>
    );
};

export default SingUp;
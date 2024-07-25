import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../../components/atoms/input';
import Button from '../../../components/atoms/button';
import styles from './partials.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import utils from '../../../utils/localstorage';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email.length || !password.length) {
            toast.error('All fields are required');
            return;
        }
        fetch('http://localhost:3001/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('Response data:', data);
            if (data?.success === 200) {
                toast.success('User Logged In Successfully');
                utils.addToLocalStorage('auth_key', data.token);
                navigate('/notes');
            } else {
                toast.error(data?.message || 'Signin failed');
            }
        }).catch((err) => {
            console.error('Fetch error:', err);
            toast.error('User Login Failed');
        });
    };

    return (
        <div className={styles.form}>
            <Button text="Join with Google" icon="ri:google-fill" className={styles.google} />
            <div className={styles.option}>
                <span>Or Join With Email</span>
            </div>
            <article className={styles.details}>
                <Input
                    type="email"
                    value={email}
                    placeholder="Enter the email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    value={password}
                    placeholder="Enter the password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    text="Sign In"
                    icon="material-symbols:login"
                    className={styles.emailBtn}
                    handleClick={handleLogin}
                />
            </article>
        </div>
    );
}

export default Signin;

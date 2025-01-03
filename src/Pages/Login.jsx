import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../Conf/Api';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission

        try {
            const response = await login({ email, password });
            if (response.token) { 
                localStorage.setItem('authToken', response.token);

                // Navigate to dashboard
                navigate('/dashboard');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className=' d-flex justify-content-center align-items-center '
            style={{ height: '100vh', backgroundColor: '#1e1e2f', }} >
            <div className='d-flex justify-content-center align-items-center'
                style={{
                    width: '40%',
                    flexDirection: 'column',
                    padding: '30px 35px',
                    background: '#2f2841',
                    borderRadius: '20px',
                    boxShadow: '0px 10px 40px #00000056',
                }}
            >
                <h1 className='text-white'>Login</h1>
                <form className='w-100' onSubmit={handleSubmit}>
                    <div className="w-100 d-flex justify-content-center align-items-start" style={{ flexDirection: 'column', margin: '10px 0' }}>
                        <label htmlFor="user" style={{ color: '#f0ffffde', marginBottom: '10px' }}>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter Email Name"
                            className="w-100 border-0 outline-none"
                            style={{
                                borderRadius: '10px', padding: '15px', background: '#514869', color: '#f0ffffde',
                                fontSize: '12px', boxShadow: '0px 10px 40px #00000056', boxSizing: 'border-box',
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Handle email input
                        />
                    </div>

                    <div className="w-100 d-flex align-items-start justify-content-center" style={{ flexDirection: 'column', margin: '10px 0' }}>
                        <label htmlFor="password" style={{ color: '#f0ffffde', marginBottom: '10px' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            className="w-100 border-0"
                            style={{
                                borderRadius: '10px', padding: '15px', background: '#514869', color: '#f0ffffde',
                                fontSize: '12px', boxShadow: '0px 10px 40px #00000056', outline: 'none', boxSizing: 'border-box',
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Handle password input
                        />
                    </div>
                    <button className='w-100 outline-none mt-5'
                        style={{
                            padding: '11px 0',
                            border: 'none',
                            textTransform: 'uppercase',
                            borderRadius: '8px',
                            fontWeight: '800',
                            letterSpacing: '3px',
                            color: '#2b134b',
                            cursor: 'pointer',
                        }} type="submit"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;

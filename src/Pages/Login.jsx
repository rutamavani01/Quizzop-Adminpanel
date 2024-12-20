import React from 'react';
import { useNavigate } from 'react-router';

function Login() {
    const navigate = useNavigate()
    const handleSubmit = () => {
        navigate('/dashboard');
    }

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
                <div className='w-100 d-flex justify-content-center align-items-start'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '10px 0',
                    }}>
                    <label
                        htmlFor="user"
                        style={{
                            color: '#f0ffffde',
                            marginBottom: '10px',
                        }} >
                        User
                    </label>
                    <input
                        type="text"
                        name="user"
                        placeholder="Enter User Name" className='w-100 border-0 outline-none'
                        style={{
                            borderRadius: '10px',
                            padding: '15px',
                            background: '#514869',
                            color: '#f0ffffde',
                            fontSize: '12px',
                            boxShadow: '0px 10px 40px #00000056',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
                <div className='w-100 d-flex align-items-start justify-content-center'
                    style={{
                        flexDirection: 'column',
                        margin: '10px 0',
                    }}
                >
                    <label
                        htmlFor="password"
                        style={{
                            color: '#f0ffffde',
                            marginBottom: '10px',
                        }}
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password" className='w-100 border-0'
                        style={{
                            borderRadius: '10px',
                            padding: '15px',
                            background: '#514869',
                            color: '#f0ffffde',
                            fontSize: '12px',
                            boxShadow: '0px 10px 40px #00000056',
                            outline: 'none',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
                <button className='w-100 outline-none'
                    style={{
                        padding: '16px 0',
                        margin: '25px',
                        border: 'none',
                        textTransform: 'uppercase',
                        borderRadius: '8px',
                        fontWeight: '800',
                        letterSpacing: '3px',
                        color: '#2b134b',
                        cursor: 'pointer',
                    }}
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;

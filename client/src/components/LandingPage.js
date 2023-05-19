import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'

export default function LandingPage() {
    return <>
        <div className='landing-main'>
            <div className='matte-black'>
                <div className='landing-left-section'>
                    <div className='heading-container'>
                        <h1 className='heading'>
                            Welcome to the World Where You Can Share Your Moments...
                        </h1>
                    </div>
                    <div className='heading-container'>
                        <h1 className='heading-2'>
                            You Can Also See What Your Friends Are Sharing...
                        </h1>
                    </div>
                </div>
                <div className='landing-right-section'>
                    <div className='links'>
                        <Link to={'/login'}>
                            <h2 className='landing-login'>LogIn</h2>
                        </Link>

                        <p>or</p>
                        <Link to={'/register'}>
                            <h2 className='landing-signup'>SignUp</h2>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    </>
}
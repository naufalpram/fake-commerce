import React, { useState } from 'react';
import { getIsLogin, setLoginState } from '../helper/localStorageHandler';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const SignInUp = () => {
  const isLoggedIn = getIsLogin();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSwipePanel = () => {
    setIsSignUp(current => !current);
    setUsername('');
    setPassword('');
    setEmail('');
  }

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const userData = {
        username: username,
        password: password
      }
      const { data, status } = await axios.post('https://fakestoreapi.com/auth/login', userData);
      if (data && status === 200) {
        setLoginState(username);
        navigate('/?success=true');
      } else {
        handleToastUp(`Error during signin: Request failed with status code ${status.code}`);
      }
    } catch(err) {
      handleToastUp(`Error during signin: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const userData = {
        username: username,
        email: email,
        password: password
      }
      const { data, status } = await axios.post('https://fakestoreapi.com/users', userData);
      if (data && status === 200) {
        setLoginState(username);
        navigate('/?success=true&signup=true');
      } else
        throw new Error('Sign up failed');
    } catch(err) {
      handleToastUp(`Error during signin: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  const handleToastUp = (message) => {
    setToastMessage(message);
    setToastError(true);
    setTimeout(() => {
      setToastError(false);
      setToastMessage('');
    }, 5000);
  }

  return isLoggedIn ? <Navigate to='/' replace /> : (
    <>
    <div className="signinup-container" style={{ display: "block" }}>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossOrigin="anonymous"
        />

        <div
          className={`container ${isSignUp && 'right-panel-active'}`}
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow:
              "0 14px 28px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            width: "768px",
            maxWidth: "100%",
            minHeight: "480px",
          }}
          id="container"
        >
          <div className="form-container sign-up-container">
            <h1 className="logo-sign h1-signinup">Fakecommerce</h1>
            <form>
              <h1 className='h1-signinup'>Create Account</h1>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input type="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className='button'
                disabled={(username === '' || email === '' || password === '') || isLoading}
                onClick={handleSignUp}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <h1 className="logo-sign h1-signinup">Fakecommerce</h1>
            <form>
              <h1 className='h1-signinup'>Sign in</h1>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className='button'
                disabled={(username === '' || password === '') || isLoading}
                onClick={handleSignIn}
              >
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className='h1-signinup'>Welcome Back!</h1>
                <p className='p-signinup'>
                  To keep connected with us please login with your personal info
                </p>
                <button className="button ghost" onClick={handleSwipePanel}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className='h1-signinup'>Hello, Friend!</h1>
                <p className='p-signinup'>Enter your personal details and start the journey with us</p>
                <button className="button ghost" onClick={handleSwipePanel}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    {toastError && toastMessage && <Toast failed={toastError} message={toastMessage} />}
    </>
  )
}

export default SignInUp
import React, { useState } from 'react';

const SignInUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSwipePanel = () => {
    setIsSignUp(current => !current);
    setUsername('');
    setPassword('');
    setEmail('');
  }
  return (
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
              <button className='button' disabled={username === '' || email === '' || password === ''}>{"Sign Up"}</button>
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
              <button className='button' disabled={username === '' || password === ''}>{"Sign In"}</button>
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
    </>
  )
}

export default SignInUp
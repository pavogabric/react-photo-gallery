import React, { useContext, useRef } from 'react';
import Button from '../../components/Button/Button';
import { AuthContext } from '../../store/auth-context';
import classes from './Login.module.scss';

interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  const authContext = useContext(AuthContext);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const submitHandler = (event: any) => {
    event.preventDefault();
    if (emailInputRef.current?.value && passwordInputRef.current?.value) {
      authContext.onLogin(
        emailInputRef.current?.value,
        passwordInputRef.current?.value
      );
    }
  };

  return (
    <div className={classes.login}>
      <form className={classes.loginForm} onSubmit={submitHandler}>
        <h1>Log In</h1>
        <div className={classes.loginFormControl}>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              ref={emailInputRef}
            />
          </div>
          <div>
            <label htmlFor="password">Password address</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
        </div>
        <Button>Log In</Button>
        {authContext.error && (
          <p style={{ color: 'red', marginTop: '15px' }}>{authContext.error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;

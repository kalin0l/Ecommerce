import React from "react";
import { useDispatch } from "react-redux";
import { FormActions } from "../store/Form-slice";
import { Link, useHistory } from "react-router-dom";
import useInput from "../useInput";
import "./loginForm.css";

const LoginForm = () => {
  

  const history = useHistory();
  const dispatch = useDispatch();

  const {
    value: email,
    hasError: emailHasError,
    isValid: emailIsValid,
    isTouchedHandler: emailIsTouched,
    inputHandler: emailHandler,
  } = useInput((value) => value.includes("@"));
  const {
    value: password,
    hasError: passHasError,
    isValid: passIsValid,
    isTouchedHandler: passIsTouched,
    inputHandler: passHandler,
  } = useInput((value) => value !== "" && value.length > 5);

  const emailClass = emailHasError ? "form-input invalid" : "form-input";
  const passClass = passHasError ? "form-input invalid" : "form-input";

  let formIsValid = false;
  if (emailIsValid && passIsValid) {
    formIsValid = true;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    

    if (!formIsValid) return;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1rbOWuxEX_etFSGQvDyq2JyEwnpzDxSE",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        header: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((res) => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.idToken);
        const time = new Date().getTime().toString() + data.expiresIn * 1000;
        console.log(time);
        dispatch(FormActions.loginHandler(data.idToken));
        // dispatch(FormActions.calculateRemainingTime(time))
        dispatch(FormActions.setUsername(email));
        history.replace("/home");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className="login-form">
      <h1>Login to Ecommerce</h1>
      <form onSubmit={submitHandler}>
        <label>
          <input
            value={email}
            type="email"
            onBlur={emailIsTouched}
            onChange={emailHandler}
            placeholder="Email"
            className={`${emailClass}`}
          ></input>
          {emailHasError && <p className="error">Email should be valid!</p>}
        </label>
        <label>
          <input
            value={password}
            type="password"
            onChange={passHandler}
            onBlur={passIsTouched}
            placeholder="Password"
            className={`${passClass}`}
          ></input>
          {passHasError && <p className="error">Password should be valid!</p>}
        </label>
        {formIsValid && <button className="form-btn">Log in</button>}
      </form>
      <div className="link-container">
        <Link to="/regForm" className="fp-link">
          Registration
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;

import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { FormActions } from "../store/Form-slice";
import useInput from "../useInput";
import Header from "./Header";
import "./regForm.css";
import { useDispatch, useSelector } from "react-redux";

const RegForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isRegister = useSelector((state) => state.register.isReg);
  const isLogin = useSelector((state) => state.register.isLogin);

  const {
    value: name,
    hasError: nameHasError,
    isValid: nameIsValid,
    isTouchedHandler: nameIsTouched,
    inputHandler: nameHandler,
  } = useInput((value) => value !== "");
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

  const nameClass = nameHasError ? "form-input invalid" : "form-input";
  const passClass = passHasError ? "form-input invalid" : "form-input";
  const emailClass = emailHasError ? "form-input invalid" : "form-input";

  let formIsValid = false;
  if (nameIsValid && emailIsValid && passIsValid) {
    formIsValid = true;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) return;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1rbOWuxEX_etFSGQvDyq2JyEwnpzDxSE",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: { "Content-type": "application/json" },
      }
    )
      .then((res) => {
        if (res.ok) {
          dispatch(FormActions.regFormValidation());
          return res.json();
        } else {
          res.json().then((res) => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);

        history.replace("/form");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <Fragment>
      <Header />
      <section className="reg-form">
        <h1>Register to Eccomerce</h1>
        {isRegister && <h1 className="success">Success!</h1>}
        <form onSubmit={submitHandler}>
          <label>
            <input
              type="text"
              value={name}
              onBlur={nameIsTouched}
              onChange={nameHandler}
              placeholder="username or phone"
              className={`${nameClass}`}
            ></input>
            {nameHasError && <p className="error">Name should be valid!</p>}
          </label>
          <label>
            <input
              value={email}
              type="email"
              onBlur={emailIsTouched}
              onChange={emailHandler}
              placeholder="email"
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
              placeholder="pass"
              className={`${passClass}`}
            ></input>
            {passHasError && <p className="error">Password should be valid!</p>}
          </label>
          {formIsValid && (
            <button
              type="submit"
              onClick={() => dispatch(FormActions.switchModHandler())}
              className="form-btn"
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          )}
          <section className="section-bottom"></section>
        </form>
      </section>
    </Fragment>
  );
};
export default RegForm;

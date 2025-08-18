import { useState, type FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { ButtonClickEvent } from "@/types";

import { ButtonText } from "../components/common/ButtonText";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { useModal } from "@/context/ModalContext";


export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setOffline } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [waiting, setWaiting] = useState(false);
  const { showAlert, showConfirm } = useModal();

  const canLogin = !!(email && password) && !(emailMessage || passwordMessage);
  // Save path the user tried to navigate to
  const from = location.state?.from?.pathname || '/';
  // Avoids redirect to the same page
  const redirectTo = from && from !== "/login" ? from : "/";

  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    if (newPassword.length >= 6) {
      setPasswordMessage('');
    } else {
      setPasswordMessage('Inserire almeno 6 caratteri')
    }

    setPassword(newPassword);
  }

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    if (newEmail.indexOf('@') > 0 && newEmail.indexOf('@') != newEmail.length - 1) {
      setEmailMessage('');
    } else {
      setEmailMessage('Email non valida')
    }

    setEmail(newEmail);
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canLogin) return;

    setWaiting(true);

    const loginResult = await login(email, password);

    setWaiting(false);

    if (loginResult instanceof FirebaseError) {
      switch (loginResult.code) {

        // Should not happen
        case AuthErrorCodes.INVALID_EMAIL:
          setEmailMessage('Mail non valida');
          break;

        // Should not happen
        case AuthErrorCodes.INVALID_PASSWORD:
          setPasswordMessage('Password non valida');
          break;

        case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
          setLoginMessage('Credenziali errate');
          setPassword('');
          break;

        default:
          setLoginMessage('Impossibile accedere. Riprova più tardi.');
          break;
      }

      return;
    }

    // Redirect user to requested page or home
    navigate(redirectTo, { replace: true });
  }

  const continueAsOffline = async (event: ButtonClickEvent) => {
    event.preventDefault();
    if (await showConfirm("Forzando la navigazione offline alcune funzionalità non saranno disponibili, continuare?")) {
      setOffline(true);
      navigate(redirectTo, { replace: true });
    }
  }

  const resetPassword = async (event: ButtonClickEvent) => {
    event.preventDefault();

    showAlert("Coming soon!");
    return;

    // check if mail inserted
    if (!email.trim() || emailMessage) {
      showAlert("Inserire un indirizzo mail per proseguire");
      return;
    }
  }

  return (
    <div className="page-container login">

      <form
        method="POST"
        action=""
        onSubmit={handleFormSubmit}
        className="login-form"
      >

        <h1 className="text-center">Poke App</h1>

        <div className="email-form-container">

          <label
            htmlFor="email"
            className="form-element"
            title="email"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className="input-icon"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="username"
              onChange={updateEmail}
              required
            />
          </label>

          {
            emailMessage &&
            <div
              className="form-validation-message email"
            >
              {emailMessage}
            </div>
          }
        </div>

        <div className="password-form-container">
          <label
            htmlFor="password"
            className="form-element"
            title="password"
          >
            <FontAwesomeIcon
              icon={faLock}
              className="input-icon"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={updatePassword}
              value={password}
              required
            />

          </label>

          {
            passwordMessage &&
            <div
              className="form-validation-message password"
            >
              {passwordMessage}
            </div>
          }

        </div>

        {
          loginMessage &&
          <div
            className="form-submit-message"
          >
            {loginMessage}
          </div>
        }

        <span
          className="fake-link"
          onClick={resetPassword}
        >Password dimenticata?
        </span>

        <div
          className="login-form-controls"
        >

          <div className="login-submit-container">
            {
              waiting ? (
                <LoadingSpinner
                  radius={10}
                  duration={1}
                  color="var(--primary-color)"
                />
              ) : (
                <ButtonText
                  text="accedi"
                  type="submit"
                  tooltip="Accedi"
                  disabled={!canLogin}
                  classes="primary-bg primary-contrast-color w-100"
                />
              )
            }
          </div>


          <span className="flex gap-1 just-between w-100" >
            Non hai ancora un account?
            <NavLink
              to={"/register"}
            >
              Registrati
            </NavLink>
          </span>


          <ButtonText
            text="continua offline"
            type="button"
            tooltip="Forza navigazione offline"
            clickHandler={continueAsOffline}
            classes="access-offline"
          />

        </div>
      </form>
    </div>
  )
}
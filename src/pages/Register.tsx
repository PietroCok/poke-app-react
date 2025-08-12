import { useState, type FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ButtonText } from "../components/common/ButtonText";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/common/LoadingSpinner";

export interface RegistrationProps {

}

export function Registration({ }: RegistrationProps) {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMessage, setPasswordMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [signUpMessage, setSignUpMessage] = useState('');
  const [waiting, setWaiting] = useState(false);

  const canSignUp =
    !!(email && password && passwordConfirm && password == passwordConfirm)
    && !(emailMessage || passwordMessage);


  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    if (newPassword.length >= 6) {
      setPasswordMessage('');
    } else {
      setPasswordMessage('Inserire almeno 6 caratteri');
    }

    setPassword(newPassword);
  }

  const updatePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    if(newPassword != password) {
      setPasswordMessage('Le password inserite non combaciano');
    } else {
      setPasswordMessage('');
    }

    setPasswordConfirm(newPassword);
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

    if (!canSignUp) return;

    setWaiting(true);

    const signupResult = await signUp(email, password);
    console.log(signupResult);

    setWaiting(false);

    if (signupResult instanceof FirebaseError) {
      switch (signupResult.code) {

        // Should not happen
        case AuthErrorCodes.INVALID_EMAIL:
          setEmailMessage('Mail non valida');
          break;

        // Should not happen
        case AuthErrorCodes.INVALID_PASSWORD:
          setPasswordMessage('Password non valida');
          break;

        case AuthErrorCodes.EMAIL_EXISTS:
          setSignUpMessage('Email già in uso');
          setPassword('');
          break;

        default:
          setSignUpMessage('Impossible completare la registrazione. Riprova più tardi.');
          break;
      }

      return;
    }

    navigate("/");
  }

  return (
    <div className="page-container signup">

      <form
        method="POST"
        action=""
        onSubmit={handleFormSubmit}
        className="signup-form"
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

        <div 
          className="password-form-container"
        >
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
              autoComplete="new-password"
              onChange={updatePassword}
              value={password}
              required
            />

          </label>

          <label
            htmlFor="password-confirm"
            className="form-element password-confirm"
            title="conferma password"
          >
            <FontAwesomeIcon
              icon={faLock}
              className="input-icon"
            />
            <input
              type="password"
              name="password-confirm"
              id="password-confirm"
              placeholder="Conferma password"
              autoComplete="new-password"
              onChange={updatePasswordConfirm}
              value={passwordConfirm}
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
          signUpMessage &&
          <div
            className="form-submit-message"
          >
            {signUpMessage}
          </div>
        }


        <div
          className="signup-form-controls"
        >

          <div className="signup-submit-container">
            {
              waiting ? (
                <LoadingSpinner
                  radius={10}
                  duration={1}
                  color="var(--primary-color)"
                />
              ) : (
                <ButtonText
                  text="Registrati"
                  type="submit"
                  tooltip="Registrati"
                  disabled={!canSignUp}
                  classes="primary-bg primary-contrast-color w-100"
                />
              )
            }
          </div>


          <span className="flex gap-1 just-between w-100" >
            Hai già un account?
            <NavLink
              to={"/login"}
            >
              Accedi
            </NavLink>
          </span>

        </div>
      </form>
    </div>
  )
}
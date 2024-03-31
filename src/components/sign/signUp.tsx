import React, { useState } from 'react';
import BasicInput from './basicInput';
import { signUpUser } from '../../api/api-client';
import { Button } from "@nextui-org/react";

interface SignUpProps {
    onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onClose }) => {
    const [login, setLogin] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConf, setPasswordConf] = useState<string>('');
    const [errorMessageLogin, setErrorMessageLogin] = useState<string>('');
    const [errorMessageEmail, setErrorMessageEmail] = useState<string>('');
    const [errorMessagePassword, setErrorMessagePassword] = useState<string>('');
    const [errorMessagePasswordConf, setErrorMessagePasswordConf] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const isValidLogin = (login: string): boolean => /^[a-zA-Z0-9]{3,}$/.test(login);
    const isValidEmail = (email: string): boolean => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    const isValidPassword = (password: string): boolean => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

    const isValidPasswordConf = (passwordConf: string): boolean => passwordConf === password;

    const disabled: boolean = isSaving || isSaved || !!errorMessageLogin || !!errorMessageEmail || !!errorMessagePassword || !!errorMessagePasswordConf || !login || !email || !password || !passwordConf;

    const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSaving(true);

        try {
            const data = await signUpUser({
                login,
                email,
                password,
            });
            setMessage(`${data.login} is now registered`);
            setIsSaved(true);
        } catch (error) {
            console.error('Error during sign up:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form className="styleClass" onSubmit={signUp}>
            <fieldset>
                <BasicInput
                    id="Login"
                    value={login}
                    label="Login"
                    type="text"
                    placeholder="Laruiss"
                    errorMessage={errorMessageLogin}
                    validMessage=""
                    onBlur={() => setErrorMessageLogin(!isValidLogin(login) ? 'Login is not valid' : '')}
                    onChange={(e) => setLogin(e.target.value)}
                />

                <BasicInput
                    id="email"
                    value={email}
                    label="Email"
                    type="email"
                    placeholder="stanislas.ormieres@yahoo.com"
                    errorMessage={errorMessageEmail}
                    validMessage=""
                    onBlur={() => setErrorMessageEmail(!isValidEmail(email) ? 'Email is not valid' : '')}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <BasicInput
                    id="password"
                    value={password}
                    label="Password"
                    type="password"
                    placeholder="Azerty.123"
                    errorMessage={errorMessagePassword}
                    validMessage=""
                    onBlur={() => setErrorMessagePassword(!isValidPassword(password) ? 'Password does not contain at least 8 characters, a capital letter, a lowercase letter and a number.' : '')}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <BasicInput
                    id="confipassword"
                    value={passwordConf}
                    label="Confirmation password"
                    type="password"
                    placeholder="Azerty.123"
                    errorMessage={errorMessagePasswordConf}
                    validMessage=""
                    onBlur={() => setErrorMessagePasswordConf(!isValidPasswordConf(passwordConf) ? 'Password confirmation does not match the password' : '')}
                    onChange={(e) => setPasswordConf(e.target.value)}
                />

                <p className="text-sm text-center text-green-500">{message}</p>
                <div className='mt-5 mb-3 flex justify-center'>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Close
                    </Button>
                    <Button type="submit" isDisabled={disabled} color="primary">
                        Sign Up
                    </Button>
                </div>
            </fieldset>
        </form>
    );
};

export default SignUp;

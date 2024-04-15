import React, { useState } from 'react';
import BasicInput from './basicInput';
import { signInUser } from '../../api/api-client'; //A voir
import { Button } from "@nextui-org/react";

interface SignInProps {
    onCloseConnection: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onCloseConnection }) => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConf, setPasswordConf] = useState<string>('');
    const [errorMessageUsername, setErrorMessageUsername] = useState<string>('');
    const [errorMessageEmail, setErrorMessageEmail] = useState<string>('');
    const [errorMessagePassword, setErrorMessagePassword] = useState<string>('');
    const [errorMessagePasswordConf, setErrorMessagePasswordConf] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);


    const isValidUsername = (username: string): boolean => /^[a-zA-Z0-9]{3,}$/.test(username);
    const isValidEmail = (email: string): boolean => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    const isValidPassword = (password: string): boolean => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

    const isValidPasswordConf = (passwordConf: string): boolean => passwordConf === password;

    const disabled: boolean = isSaving || isSaved || !!errorMessageUsername || !!errorMessagePassword || !username || !password;


    const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSaving(true);

        try {
            const data:any = await signInUser(
                username,
                password,
            );
            console.log(data);
            setMessage("Your mail is " + data.email);
            

            //TODO: close the modal

        } catch (error) {
            console.error('Error during sign in:', error);
            setMessage(`error during sign in: wrong username or password`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form className="styleClass" onSubmit={signIn}>
            <fieldset>
                <BasicInput
                    id="Username"
                    value={username}
                    label="Username"
                    type="text"
                    placeholder="Laruiss"
                    errorMessage={errorMessageUsername}
                    validMessage=""
                    onBlur={() => setErrorMessageUsername(!isValidUsername(username) ? 'Username is not valid' : '')}
                    onChange={(e) => setUsername(e.target.value)}
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

                <p className="text-sm text-center text-green-500">{message}</p>
                <div className='mt-5 mb-3 flex justify-center'>
                    <Button color="danger" variant="light" onPress={onCloseConnection}>
                        Close
                    </Button>
                    <Button type="submit" isDisabled={disabled} color="primary">
                        Sign In
                    </Button>
                </div>
            </fieldset>
        </form>
    );
};

export default SignIn;

import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { registerUser } from "../../features/api/accountingApi";

const SignUp = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const dispatch = useAppDispatch();

    const handleClickSignUp = () => {
        if(login.trim() && password.trim() && firstName.trim() && lastName.trim()) {
            dispatch(registerUser({ login, password, firstName, lastName }));
        } else {
            console.error("All fields are required");
        }
    };

    const handleClickClear = () => {
        setLogin("");
        setPassword("");
        setFirstName("");
        setLastName("");
    };

    return (
        <>
            <label>Login:
                <input
                    type={'text'}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)} />
            </label>
            <label>Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>First name:
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>Last name:
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />
            </label>
            <button onClick={handleClickSignUp}>Sign up</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default SignUp;
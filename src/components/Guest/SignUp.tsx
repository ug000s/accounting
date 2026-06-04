import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useRegisterUserMutation } from "../../features/api/accountingApi";
import { setToken } from "../../features/token/tokenSlice.ts";
import { createToken } from "../../utils/constants";

const SignUp = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const dispatch = useAppDispatch();
    const [registerUser] = useRegisterUserMutation();

    const handleClickSignUp = async () => {
        try {
            const { data, error } = await registerUser({ login, password, firstName, lastName });
            if (error) {
                console.error("sign up error", error);
            } else {
                dispatch(setToken(createToken(data.login, password)));
            }
        } catch (error) {
            console.error("unknown error", error);
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
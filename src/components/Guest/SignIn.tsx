import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchUser } from "../../features/api/accountingApi";
import { createToken } from "../../utils/constants";

const SignIn = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");   
    const dispatch = useAppDispatch();  

    const handleClickSignIn = () => {
        if(login.trim() && password.trim()) {
            dispatch(fetchUser(createToken(login.trim(), password.trim())));
        } else {
            console.error("Login and password are required");
        }
    };

    const handleClickClear = () => {
        setLogin("");
        setPassword("");
    };

    return (
        <>
            <label>Login:
                <input
                    type={"text"}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)} />
            </label>
            <label>Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={handleClickSignIn}>Sign in</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default SignIn;
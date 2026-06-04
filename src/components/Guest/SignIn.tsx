import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useLazyFetchUserQuery } from "../../features/api/accountingApi";
import { createToken } from "../../utils/constants";
import { setToken } from "../../features/token/tokenSlice";

const SignIn = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");   
    const dispatch = useAppDispatch();
    const [fetchUser] = useLazyFetchUserQuery();

    const handleClickSignIn = async () => {
        if(login.trim() && password.trim()) {
            try {
                const token = createToken(login.trim(), password.trim());
                const {error} = await fetchUser(token);
                if (error) {
                    console.error("sign in error", error);
                } else {
                    dispatch(setToken(token));
                }
            } catch (error) {
                console.error("unknown error", error);
            }
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
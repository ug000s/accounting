import { useState } from "react";
import SignIn from "./SignIn.tsx";
import SignUp from "./SignUp.tsx";

const Guest = () => {
    // isSigdIn means window for SignIn component is active
    const [isSigdIn, setIsSigdIn] = useState(false);
    return (
        <div>
            {isSigdIn ? <SignIn /> : <SignUp />}
            <button onClick={() => setIsSigdIn(!isSigdIn)}>Switch to {isSigdIn ? "Sign Up" : "Sign In"}</button>
        </div>
    );
};

export default Guest;

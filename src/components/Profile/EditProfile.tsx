import { useState } from "react";

const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const handleClickClear = () => {
        setFirstName("");
        setLastName("");
    }

    return (
        <div>
            <label>
                First Name:
                <input type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>
                Last Name:
                <input type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            {/* TODO: Add logic to save and close */}
            <button >Save and close</button>
            {/* TODO: Add logic to close without saving */}
            <button>Close without saving</button>
            <button onClick={handleClickClear}>Clear</button>
        </div>
    );
};

export default EditProfile;
import { useState } from "react";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const handleClickClear = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    }

    return (
        <div>
            <label>
                Current Password:
                <input type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </label>
            <label>
                New Password:
                <input type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </label>
            <label>
                Confirm New Password:
                <input type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
            </label>
            {/* TODO: Add logic to save and close */}
            <button>Save and close</button>
            {/* TODO: Add logic to close without saving */}
            <button>Close without saving</button>
            <button onClick={handleClickClear}>Clear</button>
        </div>
    );
};

export default ChangePassword;
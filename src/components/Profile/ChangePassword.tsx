import { useState } from "react";

const ChangePassword = ({close}: {close: () => void;}) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const handleClickSave = () => {
        if (newPassword === confirmNewPassword && newPassword !== oldPassword) {
            // TODO: Add logic to save and close
            alert('Save and close clicked');
            close();
        } else {
            alert('New password and confirm password do not match or new password is the same as old password');
        }

    }
    
    const handleClickClear = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    }

    return (
        <div>
            <label>
                Current Password:
                <input type={"password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
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
            <button onClick={handleClickSave}>Save and close</button>
            <button onClick={close}>Close without saving</button>
            <button onClick={handleClickClear}>Clear</button>
        </div>
    );
};

export default ChangePassword;
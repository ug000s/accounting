import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useChangePasswordMutation, useFetchUserQuery } from "../../features/api/accountingApi";
import { setToken } from "../../features/token/tokenSlice";
import { createToken } from "../../utils/constants";

const ChangePassword = ({ close }: { close: () => void; }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const dispatch = useAppDispatch()
    const [changePassword] = useChangePasswordMutation()
    const token = useAppSelector((state) => state.token)
    const { data } = useFetchUserQuery(token)

    const handleClickSave = async () => {
        if (newPassword === confirmNewPassword && newPassword !== oldPassword) {
            // data!.login мы говорим что data не может быть undefined
            const token = createToken(data!.login, oldPassword)
            try {
                const { error } = await changePassword({ newPassword, token })
                if (error) {
                    console.error("change password error", error);
                } else {
                    dispatch(setToken(createToken(data!.login, newPassword)))
                }
            } catch (error) {
                console.error("unknown error", error);
            }
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
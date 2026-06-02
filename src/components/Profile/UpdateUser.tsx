import { useState } from "react";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import { UPDATE_MODE_DEFAULT, UPDATE_MODE_EDIT_PROFILE, UPDATE_MODE_CHANGE_PASSWORD } from "../../utils/constants";

const UpdateUser = () => {
    const [updateMode, setUpdateMode] = useState(UPDATE_MODE_DEFAULT);

    switch (updateMode) {
        case UPDATE_MODE_EDIT_PROFILE:
            return <EditProfile />;
        case UPDATE_MODE_CHANGE_PASSWORD:
            return <ChangePassword />;
        default:
            return (
                <div>
                    <button onClick={() => setUpdateMode(UPDATE_MODE_EDIT_PROFILE)}>Edit Profile</button>
                    <button onClick={() => setUpdateMode(UPDATE_MODE_CHANGE_PASSWORD)}>Change Password</button>
                </div>
            );
    }
};

export default UpdateUser;
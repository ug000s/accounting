import { useState } from "react";
import { useFetchUserQuery, useUpdateUserMutation } from "../../features/api/accountingApi";
import { useAppSelector } from "../../app/hooks";

interface Props {
    close: () => void;
}

const EditProfile = ({ close }: Props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const token = useAppSelector((state) => state.token)
    const [updateUser] = useUpdateUserMutation()
    const { data } = useFetchUserQuery(token)

    const handleClickSave = async () => {
        try {
            const { error } = await updateUser({ user: { firstName, lastName }, token: token, login: data!.login })
            if (error) {
                console.error('update user error', error)
            }
        } catch (error) {
            console.error('unknown error', error)
        }
        close();
    }

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
            <button onClick={handleClickSave} >Save and close</button>
            <button onClick={close}>Close without saving</button>
            <button onClick={handleClickClear}>Clear</button>
        </div>
    );
};

export default EditProfile;
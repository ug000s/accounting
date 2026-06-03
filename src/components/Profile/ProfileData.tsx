import { useAppSelector } from "../../app/hooks.ts";

const ProfileData = () => {
    const { firstName, lastName, login, roles } = useAppSelector((state) => state.user);
    return (
        <>
            <p>First name: {firstName}</p>
            <p>Last name: {lastName}</p>
            <p>Login: {login}</p>
            <ul>
                <li>{roles.map(role => <li key={role}>{role}</li>)}</li>
            </ul>
        </>
    );
};

export default ProfileData;
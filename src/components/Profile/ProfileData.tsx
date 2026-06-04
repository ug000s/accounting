import { useAppSelector } from "../../app/hooks.ts";
import { useFetchUserQuery } from "../../features/api/accountingApi.ts";

const ProfileData = () => {
    const token = useAppSelector((state) => state.token);
    const { data: user, isLoading } = useFetchUserQuery(token, {
        skip: !token,
    });
    const roles = user?.roles || [];

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>User data not found</p>;
    }

    return (
        <>
            <p>First name: {user.firstName}</p>
            <p>Last name: {user.lastName}</p>
            <p>Login: {user.login}</p>
            <ul>
                <li>{roles.map(role => <li key={role}>{role}</li>)}</li>
            </ul>
        </>
    );
};

export default ProfileData;
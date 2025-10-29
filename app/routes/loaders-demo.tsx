import { useLoaderData } from "react-router";


type User = {
    login: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

export async function loader() {

    const response = await fetch("https://api.github.com/users");
    const users: User[] = await response.json();



    return {
        title: "RR7",
        list: ["Item 1", "Item 2", "Item 3"],
        users
    };

}

export function HydrateFallback() {
    return <div>Loading...</div>;
}


export default function Loaders() {

    const { users } = useLoaderData();



    console.log(users);
    return (
        <>
            <div className="flex flex-col gap-2">
                {users.map((user: User, index: number) => (
                    <div key={index} className="flex items-center gap-2">

                        <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" />
                        <p>{user.login}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
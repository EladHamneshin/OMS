import { useEffect, useState } from "react";
import { USER_SUBSCRIPTION } from "../schemas client/schem";
import { useSubscription } from "@apollo/client";

export default function PubSub() {
    const [msg, setMsg] = useState();
    const { loading, error  } = useSubscription(
        USER_SUBSCRIPTION,
        {
            onData: (data) => {
                if (data) {
                    const res = data.data.data.messagePubSub.message
                    console.log("res", res);
                    setMsg( res);
                }
            },
        }
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div>
            <h1>{msg}</h1>
        </div>
    );
}


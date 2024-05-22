import { useState } from 'react';
import Message from './Message';
import { useNavigate } from "react-router-dom";

interface Props {
    target:string,
}

const User = (props: Props) => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    (async () => {
        const response = await fetch(`${props.target}/user`, {
            method: 'GET'
      });
      if (response.ok) {
        try {
            const res = await response.json() as Message;
            setUsername(res.username);
            setMessage(res.message);
        } catch {
            navigate(props.target);
        }

      } else {
        navigate(props.target);
      }
    })();

    const onLogout = async () => {
        const response = await fetch(`${props.target}/logout`, {
            method: 'GET'
        });
        if (response.ok) {
            navigate("/");
        }
    }

  return (
    <>
        <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold">
                    Hello {username}
                </h2>
            </div>
            <p>{message}</p>
        </div>
        <div>
            <button onClick={()=>onLogout()} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-500 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Log out
            </button>
        </div>
        </div>
    </>
  )
}

export default User
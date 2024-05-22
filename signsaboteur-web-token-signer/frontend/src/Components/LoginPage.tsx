import React, {useState} from 'react'
import Message from './Message';

interface Props {
    target: string,
    onSuccess: (message: Message) => void;
}
interface Credentials {
    username: string,
    password: string
}

const LoginPage = (props:Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const creds: Credentials = {
        username,
        password
        };
        const response = await fetch(props.target, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(creds)
      });
      if (response.ok) {
        const res = await response.json() as Message;
        props.onSuccess(res);
      } else {
        setMessage('Wrong credentials!');
      }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                        {
                            message && (
                                <div>
                                <h3 className="mt-1 text-center text-fuchsia-600">{message}</h3>
                                </div>
                            )
                        }
                    <div>
                        <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-500 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    // return (
    //     <div>
    //         <form onSubmit={handleSubmit}>
    //         <div>
    //         <label>Username:</label>
    //         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
    //         </div>
    //         <div>
    //         <label>Password:</label>
    //         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //         </div>
    //         {
    //             message && 
    //             (<div className='text-fuchsia-500'>{message}</div>)
    //         }
    //         <div>
    //         <button className='mt-4 bg-slate-700 hover:bg-slate-800 font-bold py-1 px-4 rounded-full' type='submit'>Log In</button>
    //         </div>
    //         </form>
    //     </div>
    // );
}

export default LoginPage


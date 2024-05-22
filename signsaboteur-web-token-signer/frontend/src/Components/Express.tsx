
import { useState} from 'react'
import LoginPage from './LoginPage'
import Message from './Message';
import User from './User';
const Express = () => {
    const [username, setUsername] = useState('');
    const handleLogin = (message: Message) => {
      message.username && setUsername(message.username);
    }
      return (
        <>
        {username ? <User target='/express'/> : <LoginPage target='/express/login' onSuccess={handleLogin} />}
        </>
      )
}

export default Express

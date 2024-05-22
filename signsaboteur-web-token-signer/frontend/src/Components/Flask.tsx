import { useState} from 'react'
import LoginPage from './LoginPage'
import Message from './Message';
import User from './User';

const Flask = () => {
  const [username, setUsername] = useState('');
  const handleLogin = (message: Message) => {
    message.username && setUsername(message.username);
  }
    return (
      <>
      {username ? <User target='/flask/'/> : <LoginPage target='/flask/login' onSuccess={handleLogin} />}
      </>
    )
}

export default Flask
import React from 'react'

const Home = () => {
  return (
    <React.Fragment>
        <div className='text-justify leading-relaxed'>
            <span className='font-bold'>Signed we tokens</span>
            <p>
                Signed web tokens used to store different types of information on client side to reduce the server load and make distributed computation easier. 
                The most well known type of such tokens are Json Web Tokens. 
                However other frameworks have their own implementations, like Django, Flask, Express and Ruby on Rails. 
                There are a number of common problems that frameworks have to solve: 
                how to store user information at token, 
                how to protect it from modification 
                and how to make sure that it can't be reused in replay attacks. 
                The most common way to store user data is Base64 encoding, however different types of serialisation methods are used. 
                To protect the token from modification in transit HMAC (Hash-based Message Authentication Code) is used. 
                It involves cryptographic hash function, for example SHA-256, secret key and sometimes salt to verify the integrity and authenticity of a message. 
                Interestingly, some frameworks use additional functions to prepare secret_key before using it on hashing functions. 
                Such a method is called key derivation. Some derivation functions use an additional salt string to generate a key. 
                However, salts aren't changed and are well-known for each framework, 
                for instance flask uses <b>cookie-session</b> string, while Django uses longer one <b>django.contrib.sessions.backends.signed_cookies</b>. 
                Another interesting fact is that some frameworks perform additional message processing before signature calculation. 
                For example, Tornado adds a separator character to the end of the message before signature calculation, 
                and Express uses string concatenation: cookie name and values with equal sign for final hash.
            </p>
            <span className='font-bold'>To get started you may need:</span>
            <ul role="list" className="list-disc pl-5 space-y-1">
                <li>Burps Suite</li>
                <li>SignSaboteur extension</li>
            </ul>
            <p className='italic'>
                <span className='font-bold'>Tip: </span>Use navigation menu on top to switch between labs.
            </p>
            <span className='font-bold'>How to?</span>
            <p>
                Each lab has two users: admin and test. You can login into test account with credentials <code>test:test</code>. 
                Flag is admin user password. Password is randomly generated each time the docker container starts. Use the extension to identify signed tokens 
                and forge new admin session cookie to get access to the user home page. 
            </p>
            <span>There are 2 challenges:</span>
            <ul role="list" className="list-disc pl-5 space-y-1">
                <li>Flask ItsDangerous application</li>
                <li>Express cookie-session application</li>
            </ul>

        </div>
    </React.Fragment> 
  )
}

export default Home
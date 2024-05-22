### SignSaboteur web token signer

That folder contains signed web tokens laboratory. It is designed to teach you how to identify, forge and exploit security misconfigurations. That lab has two challenges: Flask login page and Express application with cookie-session middleware. Each application has two users: admin and test. You can login into the test account with credentials test:test. Flag is admin user password. Password is randomly generated each time the docker container starts. 

You will need following tools to get started:
- [Burp Suite](https://portswigger.net/burp/pro)
- [SignSaboteur extension](https://github.com/d0ge/sign-saboteur)
- Docker compose

### Installation

Run following command:
```bash
git clone https://github.com/PortSwigger/research-labs
cd research-labs/signsaboteur-web-token-signer/
docker-compose build
docker-compose up
```

Visit page http://127.0.0.1:4444/ to get access to the application

### Links
- [Blog post](https://portswigger.net/research)

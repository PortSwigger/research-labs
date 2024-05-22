### Vulnerable signed web token lab for SignSaboteur

This lab has two challenges to help you practise using SignSaboteur. The first challenge uses Flask, and the second uses ExpressJS. 

To solve each challenge, log in using `test:test` and obtain the `admin` user's password.

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

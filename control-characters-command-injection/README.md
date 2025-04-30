# ASCII Control Characters command injection

This repository contains a small Proof of Concept lab exploring command injection using ASCII control characters.

To solve each challenge, read the contents of the flag.txt file located in the /app directory.

You will need following tools to get started:
- [Burp Suite](https://portswigger.net/burp/pro)
- Docker compose

## Installation

Run following command:
```bash
git clone https://github.com/PortSwigger/research-labs
cd control-characters-command-injection
docker-compose build
docker-compose up
```

Visit page http://127.0.0.1:4444/ to get access to the application

## Links
- Blog post page: [Copy and Pwnd: Leverage ASCII characters to exploit VS Code](https://portswigger.net/research/drag-and-pwnd-leverage-ascii-characters-to-exploit-vs-code)

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pty = require('node-pty');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function escapeShellInput(str) {
  return str
    .replace(/\\/g, '\\\\')   // escape backslash
    .replace(/"/g, '\\"')     // escape double quote
    .replace(/\$/g, '\\$')    // escape dollar sign
    .replace(/`/g, '\\`')     // escape backtick
    .replace(/&/g, '\\&')     // escape ampersand
    .replace(/\|/g, '\\|')    // escape pipe
    .replace(/;/g, '\\;')     // escape semicolon
    .replace(/\n/g, '')       // remove newlines entirely
}


app.use(express.static('public'));

wss.on('connection', (ws) => {
  const shell = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env,
  });

  shell.onData(data => {
    ws.send(data);
  });
  
  ws.on('message', (msg) => {
    const escaped = escapeShellInput(msg.toString());
    shell.write(`echo "${escaped}"\n`);
  });
  

  ws.on('close', () => shell.kill());
});

server.listen(4444, () => {
  console.log('Server running at http://localhost:4444');
});

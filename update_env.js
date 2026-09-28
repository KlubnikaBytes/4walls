const fs = require('fs');
let env = fs.readFileSync('backend/.env', 'utf8');

env = env.replace(/EMAIL_USER=.*/g, 'EMAIL_USER=klubnikabytes@gmail.com');
env = env.replace(/EMAIL_PASS=.*/g, 'EMAIL_PASS=ccokldcqkjrfixre');

fs.writeFileSync('backend/.env', env, 'utf8');

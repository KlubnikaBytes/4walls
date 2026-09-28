const fs = require('fs');
const filePath = 'frontend/src/pages/Contact.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the generic Google Map iframe URL with the exact coordinate pin for Mani Casadona
content = content.replace(
  /https:\/\/maps\.google\.com\/maps\?q=[^"]+/,
  'https://maps.google.com/maps?q=22.5859932,88.4865422+(Mani+Casadona)&t=&z=16&ie=UTF8&iwloc=B&output=embed'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated Contact.jsx iframe URL');

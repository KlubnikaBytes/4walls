const fs = require('fs');
const filePath = 'frontend/src/pages/Contact.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace Google Map placeholder with an actual iframe
content = content.replace(
  /<div className="map-block">Google Map.*700160<\/div>/,
  '<div className="map-block" style={{ padding: 0, overflow: \'hidden\' }}><iframe src="https://maps.google.com/maps?q=Mani%20Casadona,%20New%20Town,%20Kolkata&t=&z=14&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" frameBorder="0" style={{ border: 0, minHeight: \'300px\' }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe></div>'
);

// Remove the duplicate phone numbers to keep just one
content = content.replace(
  /<div className="info-item"><span className="k">WhatsApp<\/span><span className="v">\+91 90518 06000<\/span><\/div>\s*<div className="info-item"><span className="k">Phone<\/span><span className="v">\+91 90518 06000<\/span><\/div>/,
  '<div className="info-item"><span className="k">Phone / WhatsApp<\/span><span className="v">+91 90518 06000<\/span><\/div>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated Contact.jsx');

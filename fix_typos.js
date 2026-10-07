const fs = require('fs');

const files = [
  'src/pages/auth/SignInPage.jsx',
  'src/pages/auth/SignUpPage.jsx',
  'src/pages/auth/OTPVerifyPage.jsx',
  'src/pages/auth/ProfileSetupPage.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/className="([^"]+)">>/g, 'className="$1">');
  fs.writeFileSync(file, content);
});
console.log('Fixed typos');

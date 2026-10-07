const fs = require('fs');

const files = [
  'src/pages/auth/SignInPage.jsx',
  'src/pages/auth/SignUpPage.jsx',
  'src/pages/auth/OTPVerifyPage.jsx',
  'src/pages/auth/ProfileSetupPage.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace container style with class
  content = content.replace(/<div\s*style={{\s*display:\s*'flex',\s*width:\s*'100%',\s*maxWidth:\s*'1000px',\s*minHeight:\s*'650px',\s*backgroundColor:\s*'#ffffff',\s*borderRadius:\s*'16px',\s*boxShadow:\s*'[^']+',\s*overflow:\s*'hidden'\s*}}/g, '<div className="auth-container-mobile">');

  // Left panel
  content = content.replace(/<div\s*style={{\s*flex:\s*'1',\s*padding:\s*'48px 56px',\s*display:\s*'flex',\s*flexDirection:\s*'column'\s*}}/g, '<div className="auth-panel-left">');

  // Right panel profile
  content = content.replace(/<div\s*style={{\s*width:\s*'340px',\s*backgroundColor:\s*'#383287',\s*padding:\s*'48px 32px',\s*display:\s*'flex',\s*flexDirection:\s*'column',\s*alignItems:\s*'center'\s*}}/g, '<div className="auth-panel-right-profile">');

  // Right panel others
  content = content.replace(/<div\s*style={{\s*flex:\s*'1',\s*backgroundColor:\s*'#383287',\s*padding:\s*'64px',\s*display:\s*'flex',\s*flexDirection:\s*'column',\s*justifyContent:\s*'center'(?:,\s*alignItems:\s*'center',\s*textAlign:\s*'center')?\s*}}/g, '<div className="auth-panel-right">');

  if (!content.includes('import \'../pages.css\';')) {
    content = content.replace(/import React[^;]+;/g, match => `${match}\nimport '../pages.css';`);
  }

  fs.writeFileSync(file, content);
});
console.log('Done!');

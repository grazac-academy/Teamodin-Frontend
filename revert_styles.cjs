const fs = require('fs');

const files = [
  'src/pages/auth/OTPVerifyPage.jsx',
  'src/pages/auth/ProfileSetupPage.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Revert container style
  content = content.replace(/<div className="auth-container-mobile">/g, `<div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1000px',
        minHeight: '650px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>`);

  // Left panel
  content = content.replace(/<div className="auth-panel-left">/g, `<div style={{ flex: '1', padding: '48px 56px', display: 'flex', flexDirection: 'column' }}>`);

  // Right panel profile
  content = content.replace(/<div className="auth-panel-right-profile">/g, `<div style={{ width: '340px', backgroundColor: '#383287', padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>`);

  // Right panel others
  content = content.replace(/<div className="auth-panel-right">/g, `<div style={{ flex: '1', backgroundColor: '#383287', padding: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>`);

  fs.writeFileSync(file, content);
});
console.log('Reverted styles');

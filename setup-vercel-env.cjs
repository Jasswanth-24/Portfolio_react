const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const cwd = 'd:/Jasswanth/react-portfolio-3/Jass-portfolio';

const envVars = [
  { name: 'EMAIL_USER', value: 'jasswanth.24@gmail.com' },
  { name: 'EMAIL_APP_PASSWORD', value: 'uzed mgdj boso ncns' },
  { name: 'NOTIFICATION_EMAIL', value: 'jasswanth.24@gmail.com' },
];

for (const { name, value } of envVars) {
  // Try to remove first
  try {
    const rmResult = execSync(`npx vercel env rm ${name} production -y`, {
      encoding: 'utf8',
      timeout: 15000,
      cwd,
      stdio: 'pipe',
    });
    console.log(`Removed ${name}: ${rmResult.trim()}`);
  } catch {
    console.log(`${name} not found (ok)`);
  }

  // Write value to temp file (no trailing newline)
  const tmpFile = path.join(cwd, '.env_tmp_value');
  fs.writeFileSync(tmpFile, value, 'utf8');

  // Add using cmd.exe with input redirection
  try {
    const addResult = execSync(
      `cmd /c "type .env_tmp_value | npx vercel env add ${name} production"`,
      {
        encoding: 'utf8',
        timeout: 20000,
        cwd,
        stdio: 'pipe',
      }
    );
    console.log(`Added ${name}: ${addResult.trim()}`);
  } catch (e) {
    // Check if it was actually added despite error
    const output = (e.stdout || '') + (e.stderr || '');
    if (output.includes('Added')) {
      console.log(`Added ${name} (with warning): ${output.trim()}`);
    } else {
      console.error(`Failed ${name}: ${output.trim()}`);
    }
  }

  // Clean up
  try { fs.unlinkSync(path.join(cwd, '.env_tmp_value')); } catch {}
}

console.log('\nDone! Now deploy with: npx vercel --prod');

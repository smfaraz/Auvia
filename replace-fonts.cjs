const fs = require('fs');
const path = require('path');

const directories = ['src/pages', 'src/components'];

function processFile(filePath) {
  if (filePath.endsWith('Home.tsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Cleanup mixed combinations
  content = content.replace(/\btext-[2345678]xl\s+(md|sm|lg):text-(display|section|small-heading|body-main)\b/g, 'text-$2');
  content = content.replace(/\btext-[2345678]xl\s+(md|sm|lg):text-[2345678]xl\s+(md|sm|lg):text-(display|section|small-heading|body-main)\b/g, 'text-$3');
  
  // Explicitly specific ones that failed
  content = content.replace(/text-6xl lg:text-\[72px\]/g, 'text-display');
  content = content.replace(/text-3xl sm:text-4xl md:text-6xl lg:text-\[80px\]/g, 'text-display');
  
  // Any lingering 3xl+ that should probably just be section or display based on font-kids
  // We'll leave them alone if they are buttons etc.

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

directories.forEach(dir => traverse(path.join(__dirname, dir)));

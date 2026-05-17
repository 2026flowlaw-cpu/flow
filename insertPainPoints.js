const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/practice/construction-dispute/page.tsx',
  'src/app/practice/class-action/page.tsx',
  'src/app/practice/general-civil/page.tsx',
  'src/app/practice/resale-cancellation/page.tsx',
  'src/app/practice/criminal-law/[center]/page.tsx',
  'src/app/practice/criminal-law/page.tsx',
  'src/app/practice/jeonse-fraud/page.tsx',
  'src/app/practice/edu-law/page.tsx',
  'src/app/practice/real-estate-dispute/page.tsx'
];

filesToUpdate.forEach(filePath => {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(absolutePath, 'utf8');

  // Add import if not present
  if (content.includes("import Stats from '@/components/Stats/Stats'") && !content.includes("PainPoints")) {
    content = content.replace(
      "import Stats from '@/components/Stats/Stats';",
      "import Stats from '@/components/Stats/Stats';\nimport PainPoints from '@/components/PainPoints/PainPoints';"
    );
  }

  // Replace <Stats /> with <Stats /> and <PainPoints />
  if (content.includes('<Stats />') && !content.includes('<PainPoints />')) {
    content = content.replace('<Stats />', '<Stats />\n      <PainPoints />');
  }

  fs.writeFileSync(absolutePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
});

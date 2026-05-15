const fs = require('fs');
const path = require('path');

const pages = [
  'src/app/practice/class-action/page.tsx',
  'src/app/practice/construction-dispute/page.tsx',
  'src/app/practice/edu-law/page.tsx',
  'src/app/practice/general-civil/page.tsx',
  'src/app/practice/jeonse-fraud/page.tsx',
  'src/app/practice/real-estate-dispute/page.tsx',
  'src/app/practice/resale-cancellation/page.tsx',
  'src/app/practice/criminal-law/[center]/page.tsx'
];

pages.forEach(pagePath => {
  const filePath = path.join(__dirname, pagePath);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add import if missing
  if (!content.includes('import PracticeCases from')) {
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    if (endOfLastImport !== -1) {
      content = content.substring(0, endOfLastImport) + '\nimport PracticeCases from \'@/components/PracticeCases/PracticeCases\';' + content.substring(endOfLastImport);
    }
  }

  // Replace everything between <Stats /> and {/* 3. 성공사례
  const regex = /(<Stats \/>)[\s\S]*?({\/\* 3\. 성공사례\(판결문\))/g;
  content = content.replace(regex, `$1\n\n        {/* 2. 케이스 */}\n        <PracticeCases />\n\n        $2`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${pagePath}`);
});

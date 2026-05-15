const fs = require('fs');
const path = require('path');

const pages = [
  'construction-dispute',
  'edu-law',
  'general-civil',
  'jeonse-fraud',
  'real-estate-dispute',
  'resale-cancellation'
];

const imports = `
import Stats from '@/components/Stats/Stats';
import SuccessStories from '@/components/SuccessStories/SuccessStories';
import FAQ from '@/components/FAQ/FAQ';
import PhilosophyMessage from '@/components/PhilosophyMessage/PhilosophyMessage';
import CustomerReviews from '@/components/CustomerReviews/CustomerReviews';
import CTA from '@/components/CTA/CTA';
`;

pages.forEach(page => {
  const filePath = path.join(__dirname, 'src/app/practice', page, 'page.tsx');
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('import Stats from')) {
    // Find the last import statement and append after it
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    
    if (endOfLastImport !== -1) {
        content = content.substring(0, endOfLastImport) + '\n' + imports + content.substring(endOfLastImport);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Added imports to ${page}`);
    }
  }
});

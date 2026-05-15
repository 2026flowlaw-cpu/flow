const fs = require('fs');
const path = require('path');

const page = path.join(__dirname, 'src/app/practice/resale-cancellation/page.tsx');
let content = fs.readFileSync(page, 'utf8');

// Comment out custom FAQ
content = content.replace(/{?\/\* FAQ Section \*\/}?/g, '');
content = content.replace(/<section className={styles.faqSection}>[\s\S]*?<\/section>/g, (match) => `{/* ${match} */}`);

// Comment out custom Philosophy
content = content.replace(/{?\/\* Philosophy Section \*\/}?/g, '');
content = content.replace(/<section className={styles.philSection}>[\s\S]*?<\/section>/g, (match) => `{/* ${match} */}`);

fs.writeFileSync(page, content, 'utf8');

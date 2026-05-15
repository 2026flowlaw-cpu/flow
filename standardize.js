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
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
`;

pages.forEach(page => {
  const filePath = path.join(__dirname, 'src/app/practice', page, 'page.tsx');
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Add imports
  if (!content.includes('import Stats from')) {
    content = content.replace("import styles from './page.module.css';", `import styles from './page.module.css';\n${imports}`);
  }

  // 2. We need to find the <Footer /> and insert the standardized bottom section before it.
  // We'll also remove InquiryForm and CTA if they already exist at the bottom to avoid duplication.
  content = content.replace(/<InquiryForm \/>/g, '');
  content = content.replace(/<CTA \/>/g, '');
  content = content.replace(/<FAQ \/>/g, '');
  content = content.replace(/<PhilosophyMessage \/>/g, '');
  content = content.replace(/<CustomerReviews \/>/g, '');
  content = content.replace(/<SuccessStories \/>/g, '');
  content = content.replace(/<Stats \/>/g, '');

  const standardBlocks = `
        {/* 3. 성공사례(판결문) */}
        <SuccessStories />

        {/* 4. FAQ */}
        <FAQ />

        {/* 5. 회사 강점소개 */}
        <PhilosophyMessage />

        {/* 6. 의뢰인후기 */}
        <CustomerReviews />

        {/* 7. 상담 */}
        <div style={{ backgroundColor: '#f8fafc', padding: '80px 0' }}>
          <div className="container">
            <InquiryForm />
          </div>
        </div>
        <CTA />
  `;

  // Replace <Footer /> with the standard blocks + <Footer />
  content = content.replace(/<Footer \/>/, `${standardBlocks}\n      <Footer />`);

  // 3. Insert Stats after Hero
  // Hero section usually ends with </section> and then the next section begins.
  // We can look for the first </section> inside <main> or the page container.
  // Alternatively, just inject it after the hero section marker.
  // Let's assume the first <section> is the Hero.
  const firstSectionEnd = content.indexOf('</section>');
  if (firstSectionEnd !== -1) {
    const before = content.substring(0, firstSectionEnd + 10);
    const after = content.substring(firstSectionEnd + 10);
    content = before + '\n\n        {/* 1. 실적 카드 */}\n        <Stats />\n' + after;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${page}`);
});

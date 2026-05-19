const fs = require('fs');
const path = require('path');

const routes = {
  'src/app/about/intro': '법무법인 소개',
  'src/app/about/group': '핵심 그룹',
  'src/app/about/location': '오시는 길',
  'src/app/about/greetings': '대표 인사말',
  'src/app/about/careers': '인재 영입',
  'src/app/news/press': '언론보도',
  'src/app/news/youtube': '미디어',
  'src/app/success-stories': '승소사례',
  'src/app/columns': '법률칼럼',
  'src/app/practice/construction-dispute': '건설분쟁',
  'src/app/practice/class-action': '집단소송',
  'src/app/practice/defect-litigation': '하자소송',
  'src/app/practice/general-civil': '일반민사',
  'src/app/practice/resale-cancellation': '분양계약해제',
  'src/app/practice/criminal-law': '형사/성범죄',
  'src/app/practice/jeonse-fraud': '전세사기',
  'src/app/practice/edu-law': '학교폭력/교육법무',
  'src/app/practice/real-estate-dispute': '부동산분쟁',
  'src/app/consult': '온라인 상담신청',
  'src/app/lawyers/profiles': '변호사 소개',
  'src/app/admin/dashboard': '관리자 대시보드'
};

for (const [routePath, title] of Object.entries(routes)) {
  const fullPath = path.join(__dirname, routePath, 'layout.tsx');
  if (!fs.existsSync(path.dirname(fullPath))) {
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  }
  
  // Only create if it doesn't exist
  if (!fs.existsSync(fullPath)) {
    const content = `import { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: '${title}',\n};\n\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return <>{children}</>;\n}\n`;
    fs.writeFileSync(fullPath, content);
    console.log(`Created ${fullPath}`);
  }
}

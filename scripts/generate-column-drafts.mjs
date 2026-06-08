import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const scrapePath = path.join(root, 'reports', 'column-source-scrape.json');
const linksPath = path.join(root, 'reports', 'column-source-links.json');
const draftsDir = path.join(root, 'seo-drafts', 'columns');
const publicArticlesDir = path.join(root, 'public', 'seo', 'articles');
const force = process.env.COLUMN_DRAFT_FORCE === '1';
const limit = Number(process.env.COLUMN_DRAFT_LIMIT || 0);
const today = process.env.COLUMN_DRAFT_DATE || '2026-06-08';

const categoryLinks = {
  분양계약해제: '/practice/resale-cancellation',
  건설: '/practice/construction',
  부동산: '/practice/real-estate-dispute',
  임대차: '/practice/real-estate-dispute',
  HR: '/practice/hr',
  '민사 일반': '/practice/civil',
  성범죄: '/practice/sex-crime',
  음주교통: '/practice/traffic',
  마약: '/practice/drug',
  보이스피싱: '/practice/voice-phishing',
  건설형사: '/practice/construction-criminal',
  경제범죄: '/practice/economic-crime',
  소년학폭: '/practice/juvenile-school',
  일반형사: '/practice/general-criminal',
};

const validCategories = new Set(Object.keys(categoryLinks));

function yamlEscape(value = '') {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function htmlEscape(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeSpaces(value = '') {
  return String(value).replace(/\s+/g, ' ').trim();
}

function cleanTopicValue(value = '') {
  return normalizeSpaces(value)
    .replace(/\s*:\s*네이버\s*블로그\s*$/i, '')
    .replace(/\s*:\s*형사\s*사례\s*자료실\s*$/i, '')
    .replace(/\s*\[[^\]]+\]\s*$/g, '')
    .replace(/^\d+\.\s*/, '')
    .trim();
}

function pickTopic(source) {
  const rawCase = cleanTopicValue(source.source_case);
  const sourceTitle = cleanTopicValue(source.source_title || '');
  const tooGeneric = /^(칼럼 작성 참고 링크 \d+|이상|지시|대응|청산|불복|승소)$/i.test(rawCase);

  if ((!rawCase || tooGeneric || rawCase.length <= 2) && sourceTitle) {
    return sourceTitle.length > 42 ? sourceTitle.slice(0, 42).trim() : sourceTitle;
  }

  return rawCase;
}

function inferCategory(source) {
  const topic = `${source.source_case} ${source.source_title || ''}`.replace(/\s+/g, '');
  if (source.category_hint === '전세사기') return '임대차';
  if (source.category_hint && source.category_hint !== '민사 일반' && categoryLinks[source.category_hint]) {
    return source.category_hint;
  }
  if (/전세|보증금|깡통|이중계약/.test(topic)) return '임대차';
  if (/공사|하자|건축|인테리어|감리|설계|일조권|조망권/.test(topic)) return '건설';
  if (/임대차|권리금|월세|명도|퇴거|원상회복|수선의무/.test(topic)) return '임대차';
  if (/보이스|계좌|전달책|인출책|텔레그램/.test(topic)) return '보이스피싱';
  if (/성범죄|강제추행|불법촬영|카메라|스토킹|성매매|강간|준강간|준강제추행|디지털성범죄|카촬/.test(topic)) return '성범죄';
  if (/음주|교통|운전|사고/.test(topic)) return '음주교통';
  if (/마약|필로폰|대마|케타민|엑스터시/.test(topic)) return '마약';
  if (/횡령|배임|투자|코인|주가/.test(topic)) return '경제범죄';
  if (/학교폭력|소년|학폭/.test(topic)) return '소년학폭';
  if (/해고|임금|퇴직금|근로|직장/.test(topic)) return 'HR';
  if (/매매|명의신탁|상속|증여|취득시효|경계침범|담보책임/.test(topic)) return '부동산';
  return source.category_hint && categoryLinks[source.category_hint] ? source.category_hint : '민사 일반';
}

function normalizeCategory(category) {
  return validCategories.has(category) ? category : '민사 일반';
}

function isCriminalCategory(category) {
  return ['성범죄', '음주교통', '마약', '보이스피싱', '건설형사', '경제범죄', '소년학폭', '일반형사'].includes(category);
}

function makeTitle(topic, category) {
  if (category === '보이스피싱') return `${topic}, 경찰조사 전에 확인해야 할 핵심 쟁점`;
  if (isCriminalCategory(category)) return `${topic}, 조사와 재판 대응에서 먼저 볼 기준`;
  if (category === '건설') return `${topic}, 공사계약 분쟁에서 손해배상까지 보는 기준`;
  if (category === '임대차') return `${topic}, 임대차 분쟁에서 계약해지와 손해배상 기준`;
  if (category === 'HR') return `${topic}, 회사와 근로자가 먼저 확인할 법적 쟁점`;
  if (category === '분양계약해제') return `${topic}, 분양계약해제 가능성을 판단하는 기준`;
  return `${topic}, 계약해제·손해배상은 어떤 기준으로 판단될까`;
}

function makeSummary(topic, category) {
  if (isCriminalCategory(category)) {
    return `${topic} 사건은 초기 진술, 증거자료, 피해 회복 여부에 따라 수사와 재판의 방향이 크게 달라집니다. 경찰조사 전 확인할 쟁점과 대응 순서를 정리했습니다.`;
  }

  return `${topic} 문제는 계약서 문구만으로 끝나지 않습니다. 고지·설명 경위, 이행 여부, 손해자료, 해제 통보 방식까지 함께 정리해야 분쟁의 방향을 잡을 수 있습니다.`;
}

function makeKeywords(topic, category, sourceKeywords = []) {
  const base = [
    topic,
    `${topic} 변호사`,
    `${topic} 상담`,
    `${topic} 소송`,
    `${topic} 손해배상`,
    category,
    '법무법인 플로우',
    '법률상담',
    '내용증명',
    '증거자료',
  ];

  if (isCriminalCategory(category)) {
    base.push('경찰조사', '형사전문변호사', '합의', '불송치', '무혐의');
  } else {
    base.push('계약해제', '계약취소', '부당이득반환', '가처분');
  }

  return [...new Set([...sourceKeywords, ...base].filter(Boolean))].slice(0, 18);
}

function categoryCopy(category) {
  if (category === '분양계약해제') {
    return {
      firstIssue: '분양계약 분쟁에서는 광고자료, 설계도면, 대출 안내, 입주 예정일, 실제 시공 상태가 계약의 중요한 전제가 되었는지 확인해야 합니다.',
      secondIssue: '분양사나 시행사가 “알 수 있었던 사정”이라고 주장할 수 있으므로, 계약 당시 제공받은 설명자료와 현장 확인 가능성, 고지 누락 여부를 함께 정리해야 합니다.',
      actionHeading: '분양계약해제 전 대응 순서',
      actionBody: '분양계약해제는 통보 시점과 문구가 중요합니다. 잔금기일, 입주지연, 대출불발, 설계변경, 하자 발생 시점별로 해제·취소·손해배상 중 어떤 구성을 택할지 먼저 검토해야 합니다.',
      focus: '분양계약서, 공급계약서, 모집공고, 광고자료, 설계도면, 대출 안내문',
    };
  }

  if (category === '건설') {
    return {
      firstIssue: '건설·공사 분쟁에서는 도급계약의 범위, 추가공사 합의, 공사 지연 사유, 하자 발생 위치와 보수 가능성이 핵심 쟁점이 됩니다.',
      secondIssue: '상대방은 구두 합의, 현장 변경, 발주자 지시, 공정 지연 책임을 주장할 수 있으므로 현장 사진과 공정표, 견적서, 감정 자료를 시간순으로 정리해야 합니다.',
      actionHeading: '공사대금·하자 분쟁 대응 순서',
      actionBody: '공사 사건은 금액 산정이 곧 쟁점입니다. 미지급 공사대금, 추가공사비, 지체상금, 하자보수비, 감액 사유를 항목별로 나누어 계산해야 소송과 합의의 기준을 잡을 수 있습니다.',
      focus: '도급계약서, 견적서, 공정표, 작업지시서, 하자 사진, 감정서',
    };
  }

  if (category === '임대차') {
    return {
      firstIssue: '임대차 분쟁에서는 보증금 반환 시점, 계약갱신 여부, 권리금 회수 방해, 원상회복 범위, 명도 가능성을 분리해 보아야 합니다.',
      secondIssue: '임대인과 임차인의 통보 내용이 법정 기간을 지켰는지, 문자나 내용증명으로 명확히 남았는지에 따라 결론이 달라질 수 있습니다.',
      actionHeading: '임대차 분쟁 대응 순서',
      actionBody: '임대차 사건은 보증금과 점유 문제가 함께 움직이는 경우가 많습니다. 계약 종료 통보, 보증금 반환 요구, 점유 이전 방지, 명도 절차를 순서대로 설계해야 합니다.',
      focus: '임대차계약서, 갱신 통보, 보증금 송금 내역, 권리금 자료, 원상회복 사진',
    };
  }

  if (category === '부동산') {
    return {
      firstIssue: '부동산 분쟁에서는 등기, 권리관계, 계약 목적, 중개 설명, 실제 현황이 계약서 내용과 맞는지 확인하는 것이 출발점입니다.',
      secondIssue: '매매계약의 해제·취소를 주장하려면 단순한 후회가 아니라 중요사항의 착오, 고지의무 위반, 채무불이행, 손해 발생을 구체적으로 입증해야 합니다.',
      actionHeading: '부동산 계약 분쟁 대응 순서',
      actionBody: '부동산 사건은 등기부, 건축물대장, 토지이용계획확인원 같은 공적 자료와 계약 전 설명자료를 함께 놓고 보아야 합니다. 청구 원인을 잘못 선택하면 시간과 비용이 늘어날 수 있습니다.',
      focus: '매매계약서, 등기부등본, 건축물대장, 토지이용계획확인원, 중개 설명자료',
    };
  }

  if (category === 'HR') {
    return {
      firstIssue: '인사·노무 분쟁에서는 근로자성, 계약의 실질, 임금 지급 구조, 해고 또는 징계 절차의 적법성이 먼저 검토됩니다.',
      secondIssue: '서류상 프리랜서나 위탁계약으로 되어 있어도 실제 지휘·감독, 근무시간, 보수 지급 방식에 따라 법적 판단이 달라질 수 있습니다.',
      actionHeading: '노무 분쟁 대응 순서',
      actionBody: '노무 사건은 노동청 진정, 민사청구, 징계 대응, 합의 중 어떤 절차가 적절한지 선택해야 합니다. 초기 자료 정리와 진술 방향이 결과에 큰 영향을 줍니다.',
      focus: '근로계약서, 급여명세서, 출퇴근 기록, 업무지시 자료, 징계·해고 통보서',
    };
  }

  if (category === '보이스피싱') {
    return {
      firstIssue: '보이스피싱 사건은 계좌 제공, 현금 전달, 인출, 온라인 지시 수행 과정에서 본인이 범행을 인식했는지가 핵심입니다.',
      secondIssue: '단순 아르바이트라고 생각했다는 주장만으로는 부족할 수 있어 구인 경위, 대화 내용, 보수 약정, 지시 방식, 이상 징후를 세밀하게 정리해야 합니다.',
      actionHeading: '보이스피싱 경찰조사 전 대응 순서',
      actionBody: '보이스피싱 사건은 첫 조사에서 역할과 인식 범위가 정리됩니다. 휴대전화 대화, 계좌 흐름, 전달 장소, 지시자를 확인하고 불리한 추측 진술을 피해야 합니다.',
      focus: '구인 공고, 텔레그램·카카오톡 대화, 계좌 거래내역, 현금 전달 경위, 조사 통지서',
    };
  }

  if (['성범죄', '음주교통', '마약', '경제범죄', '소년학폭', '일반형사', '건설형사'].includes(category)) {
    return {
      firstIssue: '형사사건에서는 혐의 사실의 범위, 구성요건 해당성, 고의 또는 인식 여부, 피해자 진술과 객관 증거의 일치 여부가 핵심입니다.',
      secondIssue: '초기 진술이 수사 기록의 기준점이 되므로, 기억나지 않는 부분을 추측으로 채우지 않고 객관 자료와 맞는 범위에서 진술을 준비해야 합니다.',
      actionHeading: '경찰조사 전 대응 순서',
      actionBody: '조사 일정이 잡히면 고소장 또는 혐의 요지를 확인하고, 유리한 자료와 불리한 자료를 동시에 검토해야 합니다. 합의, 의견서, 증거 제출 시점도 함께 설계해야 합니다.',
      focus: '고소장, 출석요구서, 대화 내역, 위치자료, 결제·송금 내역, 피해 회복 자료',
    };
  }

  return {
    firstIssue: '민사 분쟁에서는 계약 또는 법률관계의 출발점, 상대방의 의무 위반, 손해 발생, 인과관계를 차례로 확인해야 합니다.',
    secondIssue: '상대방은 책임이 없거나 손해가 과장됐다고 반박할 수 있으므로 객관 자료와 시간순 정리가 중요합니다.',
    actionHeading: '내용증명과 소송 전 대응 순서',
    actionBody: '민사사건은 바로 소송을 제기하기보다 청구 원인, 증거, 금액 산정, 상대방 재산이나 지급 가능성을 먼저 살펴야 합니다.',
    focus: '계약서, 송금 자료, 대화 기록, 내용증명, 손해 산정 자료',
  };
}

function wrapText(text, maxChars) {
  const tokens = normalizeSpaces(text).split(' ');
  const lines = [];
  let current = '';

  for (const token of tokens) {
    if (!current) {
      current = token;
      continue;
    }

    if ((current + token).length + 1 <= maxChars) {
      current += ` ${token}`;
    } else {
      lines.push(current);
      current = token;
    }
  }

  if (current) lines.push(current);

  return lines.flatMap((line) => {
    if (line.length <= maxChars + 4) return [line];
    const chunks = [];
    for (let index = 0; index < line.length; index += maxChars) {
      chunks.push(line.slice(index, index + maxChars));
    }
    return chunks;
  });
}

async function renderCardImage({ outputPath, title, category, variant }) {
  const titleLines = wrapText(title, variant === 'hero' ? 19 : 23).slice(0, variant === 'hero' ? 3 : 4);
  const accent = variant === 'hero' ? '#86b7e8' : '#c8a559';
  const subtitle = variant === 'hero' ? '법률칼럼' : '쟁점 체크리스트';
  const body = variant === 'hero'
    ? '계약서, 설명자료, 증거 흐름을 함께 보는 실무형 가이드'
    : '초기 대응은 사실관계 정리와 증거 확보에서 시작됩니다';

  const titleTspans = titleLines
    .map((line, index) => `<tspan x="96" dy="${index === 0 ? 0 : 54}">${htmlEscape(line)}</tspan>`)
    .join('');

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0d213f"/>
  <rect x="54" y="54" width="1092" height="522" rx="22" fill="#f6f8fb"/>
  <rect x="54" y="54" width="18" height="522" fill="${accent}"/>
  <circle cx="995" cy="172" r="94" fill="${accent}" opacity="0.16"/>
  <circle cx="1058" cy="462" r="138" fill="#0d213f" opacity="0.08"/>
  <text x="96" y="128" fill="#0d213f" font-family="Apple SD Gothic Neo, Noto Sans CJK KR, sans-serif" font-size="28" font-weight="700">${htmlEscape(category)} · ${subtitle}</text>
  <text x="96" y="246" fill="#0b1f3f" font-family="Apple SD Gothic Neo, Noto Sans CJK KR, sans-serif" font-size="46" font-weight="800" letter-spacing="0">${titleTspans}</text>
  <line x1="96" y1="454" x2="742" y2="454" stroke="${accent}" stroke-width="5"/>
  <text x="96" y="512" fill="#42536a" font-family="Apple SD Gothic Neo, Noto Sans CJK KR, sans-serif" font-size="27" font-weight="600">${htmlEscape(body)}</text>
  <text x="96" y="555" fill="#6d7887" font-family="Apple SD Gothic Neo, Noto Sans CJK KR, sans-serif" font-size="23">법무법인 플로우</text>
</svg>`;

  await sharp(Buffer.from(svg)).webp({ quality: 84, effort: 5 }).toFile(outputPath);
}

async function makeImages(slug, title, category, topic) {
  const dir = path.join(publicArticlesDir, slug);
  await mkdir(dir, { recursive: true });

  const imageOne = path.join(dir, 'image-01.webp');
  const imageTwo = path.join(dir, 'image-02.webp');

  await renderCardImage({ outputPath: imageOne, title, category, variant: 'hero' });
  await renderCardImage({ outputPath: imageTwo, title: `${topic} 대응 전 확인할 자료`, category, variant: 'checklist' });

  return [
    {
      src: `/seo/articles/${slug}/image-01.webp`,
      alt: `${topic} 법률칼럼 대표 이미지`,
    },
    {
      src: `/seo/articles/${slug}/image-02.webp`,
      alt: `${topic} 쟁점과 증거자료 체크리스트 이미지`,
    },
  ];
}

function makeBody({ topic, summary, category, images }) {
  const practiceLink = categoryLinks[category] || '/consult';
  const { firstIssue, secondIssue, actionHeading, actionBody, focus } = categoryCopy(category);

  return `<section>
  <p><strong>${htmlEscape(topic)} 문제는 초기에 쟁점을 어떻게 정리하느냐에 따라 결과가 크게 달라질 수 있습니다.</strong> ${htmlEscape(summary)}</p>
  <p>이 글은 ${htmlEscape(topic)}로 고민하는 분들이 상담 전 확인해야 할 기준을 한 번에 볼 수 있도록 구성했습니다. 단순히 키워드만 나열하지 않고, 실제 분쟁에서 자주 다투어지는 요건, 증거자료, 대응 순서를 함께 정리했습니다.</p>
  <blockquote>
    <p><strong>핵심 쟁점:</strong> ${htmlEscape(firstIssue)}</p>
  </blockquote>
  <figure>
    <img src="${images[0].src}" width="1200" height="630" loading="eager" alt="${htmlEscape(images[0].alt)}" style="width:100%;height:auto;" />
    <figcaption>${htmlEscape(topic)} 사건은 사실관계, 증거, 통보 방식이 함께 정리되어야 합니다.</figcaption>
  </figure>
</section>

<section>
  <h2>핵심 요약</h2>
  <ul>
    <li>${htmlEscape(topic)} 사건은 첫 상담 전에 계약서, 대화 기록, 송금 내역, 사진 등 기초 자료를 시간순으로 정리해야 합니다.</li>
    <li>${htmlEscape(category)} 분야에서는 상대방의 설명, 고지 여부, 실제 이행 내용, 손해 발생 시점이 주요 판단 기준이 됩니다.</li>
    <li>초기 통보 문구가 부정확하면 추후 소송에서 불리하게 해석될 수 있어 내용증명 또는 의견서 작성 전 법률 검토가 필요합니다.</li>
    <li>우선 확인할 자료는 ${htmlEscape(focus)}입니다.</li>
    <li>상대방과의 대화가 이미 진행 중이라면 감정적 표현보다 객관 사실, 요구사항, 회신 기한을 분리해 남기는 것이 좋습니다.</li>
    <li>증거가 부족하다고 느껴져도 사건 구조를 먼저 잡으면 추가로 확보해야 할 자료가 명확해집니다.</li>
  </ul>
</section>

<section>
  <h2>${htmlEscape(topic)}에서 먼저 확인할 법적 쟁점</h2>
  <p>${htmlEscape(firstIssue)}</p>
  <p>${htmlEscape(secondIssue)}</p>
  <p>특히 같은 ${htmlEscape(category)} 사건이라도 사실관계의 작은 차이에 따라 계약해제, 계약취소, 손해배상, 부당이득반환, 형사 고소, 가처분 등 선택해야 할 절차가 달라질 수 있습니다. 그래서 결론을 먼저 정하기보다 “무엇을 입증해야 하는 사건인지”를 먼저 정리해야 합니다.</p>
  <figure>
    <img src="${images[1].src}" width="1200" height="630" loading="lazy" alt="${htmlEscape(images[1].alt)}" style="width:100%;height:auto;" />
    <figcaption>${htmlEscape(topic)} 대응 전에는 쟁점과 자료를 분리해 보는 것이 좋습니다.</figcaption>
  </figure>
</section>

<section>
  <h2>상대방 주장을 예상해야 합니다</h2>
  <p>분쟁에서 상대방은 대개 “이미 알고 계약했다”, “문제가 될 정도는 아니다”, “손해가 과장됐다”, “본인이 확인하지 않은 책임이 있다”는 취지로 반박합니다. 형사사건이라면 “몰랐다”는 주장만으로는 부족하고, 관여 정도와 인식 가능성을 구체적으로 설명해야 할 때가 많습니다.</p>
  <p>따라서 ${htmlEscape(topic)} 사건은 주장 자체보다 그 주장을 뒷받침하는 자료의 밀도가 중요합니다. 계약 체결 전 자료, 현장 확인 경위, 상대방 설명, 문제 발견 시점, 이의제기 내역을 시간순 표로 정리하면 사건의 흐름이 훨씬 선명해집니다.</p>
</section>

<section>
  <h2>증거자료는 이렇게 정리하는 것이 좋습니다</h2>
  <ol>
    <li><strong>기초 문서:</strong> 계약서, 특약, 견적서, 광고자료, 약관, 안내문, 고지서, 송금 자료를 한 곳에 모읍니다.</li>
    <li><strong>대화 기록:</strong> 문자, 카카오톡, 이메일, 통화 녹취는 날짜순으로 정리하고 핵심 문장을 표시합니다.</li>
    <li><strong>현장 자료:</strong> 사진, 동영상, 하자 진단서, 감정 자료, 수리 견적서처럼 상태를 보여주는 자료를 확보합니다.</li>
    <li><strong>손해 자료:</strong> 지출 영수증, 대체 비용, 영업 손실, 이자, 지체 기간 등 금액 산정에 필요한 자료를 구분합니다.</li>
    <li><strong>절차 자료:</strong> 내용증명, 고소장, 답변서, 경찰 출석요구, 법원 서류 등 이미 진행된 절차를 빠짐없이 확인합니다.</li>
  </ol>
</section>

<section>
  <h2>${htmlEscape(actionHeading)}</h2>
  <p>${htmlEscape(actionBody)}</p>
  <p>상담 단계에서는 “이길 수 있는지”만 묻기보다, 어떤 청구가 가능한지, 어떤 증거가 부족한지, 상대방이 어떤 반박을 할지, 소송과 합의 중 어느 경로가 비용 대비 효율적인지까지 함께 점검해야 합니다.</p>
  <blockquote>
    <p><strong>실무 포인트:</strong> ${htmlEscape(topic)} 사건은 첫 통보, 첫 진술, 첫 답변서에서 방향이 잡히는 경우가 많습니다. 초기 문서와 진술을 가볍게 처리하지 않는 것이 중요합니다.</p>
  </blockquote>
</section>

<section>
  <h2>초기 대응에서 피해야 할 실수</h2>
  <p>가장 흔한 실수는 상대방에게 결론부터 강하게 말한 뒤, 정작 이를 뒷받침할 자료를 나중에 찾는 것입니다. 법적 분쟁에서는 표현의 강도보다 사실관계의 정확성, 자료의 순서, 요구사항의 일관성이 더 중요합니다.</p>
  <p>또 하나는 인터넷 글이나 주변 사례만 보고 자신의 사건도 같은 결론이 날 것이라고 단정하는 것입니다. ${htmlEscape(topic)} 사건은 금액, 통보 시점, 계약 문구, 당사자의 태도, 증거의 형태에 따라 전략이 달라지므로 상담 전에는 “내 사건에서 빠진 자료가 무엇인지”를 확인하는 관점으로 접근하는 것이 좋습니다.</p>
</section>

<section>
  <h2>상담 전 체크리스트</h2>
  <ul>
    <li>문제가 언제 처음 발견되었는지 날짜를 특정할 수 있나요?</li>
    <li>상대방에게 문제를 알린 기록과 그에 대한 답변이 남아 있나요?</li>
    <li>계약서나 안내자료에 ${htmlEscape(topic)}와 관련된 문구가 있나요?</li>
    <li>손해 금액을 설명할 수 있는 영수증, 견적서, 송금 내역이 있나요?</li>
    <li>이미 내용증명, 고소장, 답변서를 보냈다면 그 문서의 사본이 있나요?</li>
  </ul>
</section>

<section>
  <h2>자주 묻는 질문</h2>
  <h3>${htmlEscape(topic)} 문제만으로 바로 소송이 가능한가요?</h3>
  <p>가능성은 사건별로 다릅니다. 먼저 상대방의 의무 위반, 손해 발생, 인과관계, 통보 방식이 정리되어야 하며, 소송 전 내용증명이나 합의 절차가 더 효율적인 경우도 있습니다.</p>

  <h3>증거가 부족해도 상담을 받아볼 수 있나요?</h3>
  <p>가능합니다. 현재 가진 자료로 사건 구조를 먼저 잡고, 부족한 자료가 무엇인지 확인하는 것이 상담의 중요한 목적입니다. 자료가 완벽해질 때까지 기다리면 대응 기한을 놓칠 수 있습니다.</p>

  <h3>상대방과 계속 대화해도 되나요?</h3>
  <p>필요한 대화는 가능하지만 감정적 표현이나 단정적인 법률 판단을 남기는 것은 피하는 것이 좋습니다. 핵심 사실과 요구사항, 회신 기한을 짧고 명확하게 남기는 방식이 안전합니다.</p>
</section>

<section>
  <h2>법무법인 플로우의 조력</h2>
  <p>법무법인 플로우는 <a href="${practiceLink}">${htmlEscape(category)} 사건</a>에서 계약 검토, 내용증명, 손해배상 청구, 형사 대응, 소송 전략까지 사건 단계에 맞는 대응 방향을 함께 설계합니다.</p>
  <p>${htmlEscape(topic)}로 분쟁이 시작되었다면 자료를 모아두는 것만으로는 부족할 수 있습니다. 현재 상황에서 어떤 절차를 먼저 선택해야 하는지, 상대방에게 어떤 문구로 통보해야 하는지, 소송으로 갈 경우 핵심 입증 포인트가 무엇인지 구체적으로 점검해 보시기 바랍니다.</p>
</section>`;
}

function makeFaqJsonLd(topic) {
  const questions = [
    {
      name: `${topic} 문제만으로 바로 소송이 가능한가요?`,
      text: '가능성은 사건별로 다릅니다. 상대방의 의무 위반, 손해 발생, 인과관계, 통보 방식이 정리되어야 하며, 소송 전 내용증명이나 합의 절차가 더 효율적인 경우도 있습니다.',
    },
    {
      name: '증거가 부족해도 상담을 받아볼 수 있나요?',
      text: '가능합니다. 현재 가진 자료로 사건 구조를 먼저 잡고, 부족한 자료가 무엇인지 확인하는 것이 상담의 중요한 목적입니다.',
    },
    {
      name: '상대방과 계속 대화해도 되나요?',
      text: '필요한 대화는 가능하지만 감정적 표현이나 단정적인 법률 판단을 남기는 것은 피하는 것이 좋습니다. 핵심 사실과 요구사항, 회신 기한을 명확하게 남기는 방식이 안전합니다.',
    },
  ];

  return `<script type="application/ld+json">
${JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions.map((question) => ({
        '@type': 'Question',
        name: question.name,
        acceptedAnswer: {
          '@type': 'Answer',
          text: question.text,
        },
      })),
    },
    null,
    2
  )}
</script>`;
}

function makeDraftMarkdown({ source, slug, title, summary, category, keywords, images, content, faqJsonLd }) {
  const sourceTitle = source.source_title || source.source_case;
  const imagesYaml = images
    .map((image) => `  - src: "${image.src}"\n    alt: "${yamlEscape(image.alt)}"`)
    .join('\n');

  return `---
source_case: "${yamlEscape(source.source_case)}"
source_url: "${yamlEscape(source.url)}"
source_title: "${yamlEscape(sourceTitle)}"
slug: "${yamlEscape(slug)}"
title: "${yamlEscape(title)}"
summary: "${yamlEscape(summary)}"
category: "${yamlEscape(category)}"
author_name: "대표변호사"
keywords: "${yamlEscape(keywords.join(', '))}"
images:
${imagesYaml}
status: "draft"
created_at: "${today}"
---

## Upload Fields

### title
${title}

### summary
${summary}

### category
${category}

### author_name
대표변호사

### custom_meta
${keywords.join(', ')}

### content
\`\`\`html
${content}
\`\`\`

## FAQ JSON-LD Draft

\`\`\`html
${faqJsonLd}
\`\`\`
`;
}

async function loadSources() {
  try {
    return JSON.parse(await readFile(scrapePath, 'utf8')).sources;
  } catch {
    return JSON.parse(await readFile(linksPath, 'utf8')).sources;
  }
}

const sources = (await loadSources()).filter((source) => !source.existing_draft);
const selectedSources = limit > 0 ? sources.slice(0, limit) : sources;
await mkdir(draftsDir, { recursive: true });

let created = 0;
let skipped = 0;

for (const [offset, source] of selectedSources.entries()) {
  const topic = pickTopic(source);
  const category = normalizeCategory(inferCategory(source));
  const title = makeTitle(topic, category);
  const summary = makeSummary(topic, category);
  const keywords = makeKeywords(topic, category, source.source_keywords);
  const slug = source.draft_slug || `column-${String(source.index).padStart(3, '0')}-${source.source_id || source.index}`;
  const fileIndex = String(offset + 4).padStart(3, '0');
  const draftPath = path.join(draftsDir, `${fileIndex}-${slug}.md`);

  if (!force) {
    try {
      await readFile(draftPath, 'utf8');
      skipped += 1;
      continue;
    } catch {
      // Continue when the draft does not exist.
    }
  }

  const images = await makeImages(slug, title, category, topic);
  const content = makeBody({ topic, summary, category, images });
  const faqJsonLd = makeFaqJsonLd(topic);
  const markdown = makeDraftMarkdown({ source, slug, title, summary, category, keywords, images, content, faqJsonLd });

  await writeFile(draftPath, markdown, 'utf8');
  created += 1;
}

console.log(`Generated ${created} draft(s), skipped ${skipped}.`);
console.log(`Draft directory: ${draftsDir}`);
console.log(`Image directory: ${publicArticlesDir}`);

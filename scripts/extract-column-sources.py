#!/usr/bin/env python3
import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

import fitz


ROOT = Path.cwd()
DEFAULT_PDF = Path("/Users/sachaone/Downloads/크리머스 마케팅.pdf")
PDF_PATH = Path(os.environ.get("COLUMN_SOURCE_PDF", DEFAULT_PDF))
OUTPUT_PATH = Path(os.environ.get("COLUMN_SOURCE_OUTPUT", ROOT / "reports" / "column-source-links.json"))
DRAFTS_DIR = ROOT / "seo-drafts" / "columns"

HEADER_WORDS = {
    "케이스",
    "세부케이스",
    "작성",
    "참고용",
    "아티클",
    "블로그",
    "(블로그",
    "등)",
    "등",
    "링크",
}


def clean_spaces(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("\u200b", " ")).strip()


def clean_title(value: str) -> str:
    value = clean_spaces(value)
    value = re.sub(r"\s+([·,.)])", r"\1", value)
    value = re.sub(r"([(])\s+", r"\1", value)
    return value.strip(" -·")


def source_kind(url: str) -> str:
    hostname = urlparse(url).hostname or ""
    if hostname.endswith("blog.naver.com"):
        return "naver_blog"
    if "ilshincrime.com" in hostname:
        return "ilshin_legacy"
    return "external"


def normalize_url(url: str) -> str:
    url = url.strip().rstrip(".,)")
    parsed = urlparse(url)
    if "blog.naver.com" in (parsed.hostname or ""):
        match = re.search(r"blog\.naver\.com/([^/?#]+)/(\d+)", url)
        if match:
            return f"https://blog.naver.com/{match.group(1)}/{match.group(2)}"
    return url


def is_incomplete_url(url: str) -> bool:
    return "bmode=view&idx=&" in url or url.endswith("bmode=view&idx=") or url.endswith("&idx=")


def existing_source_urls() -> set[str]:
    urls = set()
    if not DRAFTS_DIR.exists():
        return urls

    for draft_path in DRAFTS_DIR.glob("*.md"):
        text = draft_path.read_text(encoding="utf-8")
        match = re.search(r'^source_url:\s*["\']?([^"\']+)["\']?\s*$', text, re.MULTILINE)
        if match:
            urls.add(normalize_url(match.group(1)))
    return urls


def row_words_for_link(page, link_rect):
    words = page.get_text("words")
    cy = (link_rect.y0 + link_rect.y1) / 2
    row = []

    for word in words:
        x0, y0, x1, y1, text, *_ = word
        if x1 >= link_rect.x0 - 8:
            continue
        if abs(((y0 + y1) / 2) - cy) > 7.5:
            continue
        if text.startswith("http") or text in HEADER_WORDS or re.fullmatch(r"\d+", text):
            continue
        row.append((x0, clean_spaces(text)))

    row.sort(key=lambda item: item[0])
    left = clean_title(" ".join(text for x, text in row if x <= 220))
    right = clean_title(" ".join(text for x, text in row if x > 220))
    title = right or left

    return title, left, right


def title_from_text_line(page_text: str, url: str) -> str:
    lines = [clean_spaces(line) for line in page_text.splitlines()]
    lines = [line for line in lines if line]
    for index, line in enumerate(lines):
        if url in line:
            before = clean_spaces(line.split(url)[0])
            if before and not before.startswith("http"):
                return clean_title(before)
            for candidate in reversed(lines[max(0, index - 4) : index]):
                if not candidate.startswith("http") and candidate not in HEADER_WORDS and not re.fullmatch(r"\d+", candidate):
                    return clean_title(candidate)
    return ""


def infer_category_hint(title: str, page_number: int) -> str:
    text = title.replace(" ", "")

    if page_number == 1:
        return "분양계약해제"
    if page_number == 2 or any(keyword in text for keyword in ["전세", "보증금", "깡통", "이중계약"]):
        return "전세사기"
    if any(keyword in text for keyword in ["공사", "하자", "건축", "인테리어", "감리", "설계", "일조권", "조망권"]):
        return "건설"
    if any(keyword in text for keyword in ["임대차", "권리금", "월세", "명도", "퇴거", "원상회복", "수선의무"]):
        return "임대차"
    if any(keyword in text for keyword in ["보이스", "계좌", "전달책", "인출책", "텔레그램"]):
        return "보이스피싱"
    if any(keyword in text for keyword in ["성범죄", "강제추행", "카메라", "불법촬영", "스토킹"]):
        return "성범죄"
    if any(keyword in text for keyword in ["음주", "교통", "운전", "사고"]):
        return "음주교통"
    if any(keyword in text for keyword in ["마약", "필로폰", "대마"]):
        return "마약"
    if any(keyword in text for keyword in ["횡령", "배임", "사기", "주가", "코인", "투자"]):
        return "경제범죄"
    if any(keyword in text for keyword in ["학교폭력", "소년", "학폭"]):
        return "소년학폭"
    if any(keyword in text for keyword in ["해고", "임금", "퇴직금", "근로", "직장"]):
        return "HR"
    if any(keyword in text for keyword in ["매매", "명의신탁", "상속", "증여", "취득시효", "경계침범", "담보책임"]):
        return "부동산"
    return "민사 일반"


def id_suffix(url: str) -> str:
    if "blog.naver.com" in url:
        match = re.search(r"/(\d{6,})(?:[/?#]|$)", url)
        if match:
            return match.group(1)

    parsed = urlparse(url)
    query_match = re.search(r"(?:idx|logNo)=([0-9]+)", parsed.query)
    if query_match:
        return query_match.group(1)

    compact = re.sub(r"[^a-zA-Z0-9]+", "-", parsed.path).strip("-")
    return compact[-24:] or "source"


def extract_sources():
    if not PDF_PATH.exists():
        raise FileNotFoundError(f"PDF not found: {PDF_PATH}")

    doc = fitz.open(str(PDF_PATH))
    existing_urls = existing_source_urls()
    sources = []
    seen = set()

    for page_index, page in enumerate(doc, start=1):
        page_text = page.get_text("text")
        links = [
            link
            for link in page.get_links()
            if link.get("uri") and link.get("from")
        ]

        for row_index, link in enumerate(sorted(links, key=lambda item: (item["from"].y0, item["from"].x0)), start=1):
            url = normalize_url(link["uri"])
            if is_incomplete_url(url) or url in seen:
                continue

            title, section_hint, topic_column = row_words_for_link(page, link["from"])
            if not title:
                title = title_from_text_line(page_text, url)

            title = clean_title(title) or f"칼럼 작성 참고 링크 {len(sources) + 1}"
            seen.add(url)
            sources.append(
                {
                    "index": len(sources) + 1,
                    "pdf_page": page_index,
                    "pdf_row": row_index,
                    "source_case": title,
                    "section_hint": section_hint,
                    "topic_hint": topic_column,
                    "category_hint": infer_category_hint(title, page_index),
                    "url": url,
                    "source_kind": source_kind(url),
                    "domain": urlparse(url).hostname or "",
                    "source_id": id_suffix(url),
                    "existing_draft": url in existing_urls,
                }
            )

        for raw_url in re.findall(r"https?://[^\s)]+", page_text):
            url = normalize_url(raw_url)
            if is_incomplete_url(url) or url in seen:
                continue

            title = title_from_text_line(page_text, raw_url) or title_from_text_line(page_text, url)
            title = clean_title(title) or f"칼럼 작성 참고 링크 {len(sources) + 1}"

            seen.add(url)
            sources.append(
                {
                    "index": len(sources) + 1,
                    "pdf_page": page_index,
                    "pdf_row": None,
                    "source_case": title,
                    "section_hint": "",
                    "topic_hint": "",
                    "category_hint": infer_category_hint(title, page_index),
                    "url": url,
                    "source_kind": source_kind(url),
                    "domain": urlparse(url).hostname or "",
                    "source_id": id_suffix(url),
                    "existing_draft": url in existing_urls,
                }
            )

    for index, source in enumerate(sources, start=1):
        source["index"] = index
        source["draft_slug"] = f"column-{index:03d}-{source['source_id']}"

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "pdf_path": str(PDF_PATH),
        "total_sources": len(sources),
        "existing_drafts": sum(1 for source in sources if source["existing_draft"]),
        "new_sources": sum(1 for source in sources if not source["existing_draft"]),
        "sources": sources,
    }


def main():
    result = extract_sources()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Extracted {result['total_sources']} unique source URL(s).")
    print(f"Existing drafts: {result['existing_drafts']}")
    print(f"New draft targets: {result['new_sources']}")
    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()

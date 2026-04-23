-- 1. 상담 테이블의 보안 정책(RLS)을 완전히 끕니다.
ALTER TABLE public.consultations DISABLE ROW LEVEL SECURITY;

-- 2. 로그인하지 않은 방문자(anon)도 데이터를 넣을 수 있게 허용합니다.
GRANT ALL ON TABLE public.consultations TO anon;
GRANT ALL ON TABLE public.consultations TO authenticated;
GRANT ALL ON TABLE public.consultations TO postgres;

-- 3. (중요) 자동 증가하는 ID 번호표(Sequence)에 대한 권한도 함께 줍니다.
GRANT USAGE, SELECT ON SEQUENCE consultations_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE consultations_id_seq TO authenticated;

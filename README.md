# VibeDic

**필요할 때 꺼내 찾는 바이브코딩 UI·UX 사전**

VibeDic은 바이브코딩으로 웹사이트와 애플리케이션을 만드는 사람이 UI 요소의 공식 명칭과 역할을 쉽게 찾아보고, 실제 유명 서비스에서 어떻게 사용되는지 확인하며, 관련 UX 패턴과 PC·태블릿·모바일 환경의 차이를 이해할 수 있도록 돕는 사례 기반 학습 웹앱입니다.

- 배포 주소: https://vibedic.chichiboo.link/

## 핵심 콘셉트

```text
궁금한 UI 또는 UX를 검색한다.
→ 공식 명칭과 역할을 확인한다.
→ 유명 서비스의 사용 사례를 살펴본다.
→ PC·태블릿·모바일의 차이를 비교한다.
→ 헷갈리는 이름은 비교표로 구분한다.
→ 기술 스택·공통 조건을 골라 내 웹앱용 프롬프트를 복사한다.
→ 필요하면 저장함에 보관한다.
```

## 주요 기능

- **UI 사전 (63개 항목, 6개 분류)** — 화면 나누기 / 이동하기 / 누르고 선택하기 / 입력하기 / 정보 보여주기 / 상태 알려주기
- **UX 사전 (43개 패턴, 8개 분류)** — 찾기 / 입력하기 / 선택하기 / 이동하기 / 실행하고 확인하기 / 기다리고 이해하기 / 공유하고 협업하기 / 시작하고 익숙해지기
- **인터랙티브 데모 (63종, 전 항목)** — 모든 UI 항목이 자기만의 데모를 갖습니다. 버튼·토글·모달처럼 바로 눌러 보는 것부터, 헤더·사이드바·하단 내비게이션처럼 축소한 화면 틀 안에서 실제로 움직여 보는 것까지
- **데모와 같은 모양의 썸네일** — 목록 카드 썸네일에 상세 페이지 데모와 같은 도식이 들어가, 무엇인지 보고 바로 상세로 들어갈 수 있습니다
- **유명 서비스 16개 + 사례 도식** — 서비스 화면을 단순화한 CSS 와이어프레임 위에 해당 요소가 쓰이는 자리를 강조해 표시 (스크린샷 미사용). 서비스 아이콘은 [Simple Icons](https://simpleicons.org)(아이콘 데이터 CC0-1.0)의 브랜드 마크를 인라인 SVG로 넣었고, 목록에 없는 브랜드는 브랜드 색 타일로 대체합니다
- **카드 전체 클릭** — UI·UX·서비스 카드 모두 썸네일과 아이콘을 포함한 카드 어디를 눌러도 상세로 이동
- **헷갈리는 UI 구분하기 (12가지 주제)** — 모달·바텀 시트·드로어, 칩·태그·배지처럼 비슷한 요소를 같은 기준의 비교표(넓은 화면)·카드(모바일)로 나란히 보여 주고, 한 줄 정리와 프롬프트 팁을 함께 제공
- **바이브코딩 프롬프트 가이드** — 사전을 프롬프트에 활용하는 5가지 원칙(아쉬운/더 나은 프롬프트 예시), 채워 쓰는 프롬프트 뼈대, 공통 조건 모음
- **프롬프트 빌더** — UI·UX 상세의 “내 웹앱에 적용하기”에서 기술 스택(HTML·CSS·JS / React + Tailwind / Next.js)과 공통 조건(반응형·접근성·다크 모드·모든 상태·한국어 문구)을 골라 기본 프롬프트에 덧붙여 복사. 고른 옵션은 저장되어 다른 항목에서도 이어짐
- **빠른 검색 (커맨드 팔레트)** — 어느 화면에서든 `Ctrl/⌘ + K` 또는 `/` 키로 열고, 입력 즉시 결과를 화살표·Enter로 이동
- **상세 페이지 탐색** — 넓은 화면의 고정 목차(현재 구획 강조), 모바일의 구획 바로가기 칩, 이전·다음 항목 이동, 링크 복사 버튼
- **기기별 비교 12가지 주제** — 사이드바 vs 하단 내비게이션, 모달 vs 바텀 시트 등
- **통합 검색** — 한글/영문/부분 일치/띄어쓰기 차이 대응, 최근 검색어, 결과 유형 표시와 유형별 필터
- **주소로 남는 목록 필터** — UI·UX 목록의 분류·검색어·인기 필터가 주소(`?category=&q=`)에 남아 뒤로 가기·링크 공유 시 그대로 유지
- **홈 화면** — 분류별 바로가기(파스텔 색과 아이콘), 날마다 바뀌는 “오늘의 UI”, 헷갈리는 UI·프롬프트 가이드 진입
- **저장함 & 최근 본 항목** — 로그인 없이 `localStorage`로 관리
- **바이브코딩 프롬프트 복사** — 모든 항목에 AI에게 바로 붙여 넣을 수 있는 프롬프트 제공
- **VibeDic 어시스턴트 (Gemini)** — 우측 하단 플로팅 버튼으로 여는 AI 채팅. 상황을 설명하면 사전 항목을 링크로 추천하고 구현용 프롬프트를 제안. 5개 모델 폴백 체인과 배터리 형태의 사용 모델 표시, 모바일 반응형 지원
- **웹폰트** — 한글은 PretendardGOV, 영문 보조 서체로 Geist Mono·Instrument Serif
- **다크/라이트 모드** — 헤더의 토글 버튼으로 즉시 전환, 선택값은 `localStorage`에 저장되어 다음 방문에도 유지되며 저장된 값이 없으면 시스템(OS) 설정을 따름. 첫 렌더 전에 테마를 적용하는 인라인 스크립트로 새로고침 시 깜빡임(FOUC) 방지

## 화면 구조

| 라우트 | 화면 |
| --- | --- |
| `#/` | 홈 (히어로, 통합 검색, 추천 항목) |
| `#/ui`, `#/ui/:slug` | UI 요소 목록·상세 |
| `#/ux`, `#/ux/:slug` | UX 패턴 목록·상세 |
| `#/services`, `#/services/:slug` | 유명 서비스 목록·상세 |
| `#/compare` | 기기별 비교 |
| `#/versus` | 헷갈리는 UI 구분하기 |
| `#/guide` | 바이브코딩 프롬프트 가이드 |
| `#/search` | 통합 검색 |
| `#/saved` | 저장함 + 최근 본 항목 |
| `#/about` | 소개 |
| 그 외 | 404 페이지 |

GitHub Pages에서 새로고침 시 404가 발생하지 않도록 `HashRouter`를 사용합니다.

## 기술 스택

- React 18 + TypeScript (strict)
- Vite 5
- Tailwind CSS 3
- React Router 6 (`HashRouter`)
- Lucide React (아이콘)
- Fuse.js (검색)
- PretendardGOV 웹폰트 (jsDelivr CDN), Geist Mono·Instrument Serif (Google Fonts)
- Google Gemini API (어시스턴트, 사용자/환경변수 키)
- Vitest + React Testing Library
- ESLint 9
- GitHub Actions → GitHub Pages 배포

콘텐츠 데이터는 백엔드 없이 TypeScript 정적 데이터로 관리하며, 로그인·데이터베이스는 사용하지 않습니다. 어시스턴트만 사용자가 넣은 키로 Gemini API를 브라우저에서 직접 호출합니다(별도 서버 없음).

## 로컬 실행 방법

```bash
git clone https://github.com/chichiboo123/vibedic.git
cd vibedic
npm install
npm run dev
```

## 테스트 방법

```bash
npm run lint          # ESLint
npm run test -- --run # Vitest (CI 모드)
```

테스트는 홈/목록/상세 렌더링, 카테고리 필터, 한글·영문 검색, 결과 없음, 저장함 추가·해제, localStorage 복원, 프롬프트 복사와 토스트, 탭 전환, 모달 열기·닫기, 404, 데이터 무결성 등을 검증합니다.

## 빌드 방법

```bash
npm run build    # tsc 타입 검사 + 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기
```

`vite.config.ts`의 `base: '/'` 설정은 **커스텀 도메인이 루트 경로에서 서빙되는 것**을 기준으로 합니다. `chichiboo123.github.io/vibedic/` 같은 GitHub Pages 프로젝트 하위 경로로 되돌린다면 `base`를 다시 `/vibedic/`로 바꿔야 에셋 경로가 맞습니다(그렇지 않으면 JS/CSS가 404가 되어 흰 화면만 나옵니다).

## GitHub Pages 배포 방법

`main` 브랜치에 push하면 `.github/workflows/deploy.yml` 워크플로가 실행됩니다.
린트 → 테스트 → 빌드 순서로 진행되며, 하나라도 실패하면 배포가 중단됩니다.

### GitHub Pages 저장소 설정

```text
1. GitHub 저장소의 Settings로 이동
2. Pages 메뉴 선택
3. Build and deployment의 Source를 GitHub Actions로 설정
4. main 브랜치에 코드 push
5. Actions에서 배포 성공 여부 확인
```

### 커스텀 도메인(vibedic.chichiboo.link) 설정

`public/CNAME` 파일(`vibedic.chichiboo.link`)이 빌드마다 `dist/`에 그대로 복사되어 배포 아티팩트에 포함됩니다. GitHub Pages는 이 파일을 읽어 저장소의 커스텀 도메인 설정을 자동으로 인식합니다. 다만 아래 두 가지는 저장소 관리자가 직접 해야 합니다.

```text
1. 도메인을 관리하는 DNS 제공자에서 CNAME 레코드 추가
   호스트: vibedic (또는 vibedic.chichiboo.link)
   값: chichiboo123.github.io
2. GitHub 저장소 Settings → Pages → Custom domain에
   vibedic.chichiboo.link가 자동 반영됐는지 확인
   (반영 전이면 직접 입력 후 Save)
3. DNS 전파와 인증서 발급이 끝나면 Enforce HTTPS 체크박스를 켬
```

DNS가 아직 전파되지 않았거나 `base`와 실제 서빙 경로가 어긋나면(예: 커스텀 도메인인데 `base`가 `/vibedic/`로 남아있는 경우) 자바스크립트·CSS가 404가 되어 화면이 흰색으로만 보입니다. 배포 후 흰 화면이 보이면 브라우저 개발자 도구의 Network 탭에서 자산 경로가 404인지부터 확인하세요.

## 데이터 구조

```text
src/
  data/
    categories.ts          # UI 6개, UX 8개 분류 정의
    uiItems.ts             # UI 항목 집계 + 조회 함수
    ui/                    # 분류별 UI 항목 데이터
    uxPatterns.ts          # UX 패턴 집계 + 조회 함수
    ux/                    # 분류별 UX 패턴 데이터
    services.ts            # 유명 서비스 16개
    deviceComparisons.ts   # 기기별 비교 12개 주제
    versus.ts              # 헷갈리는 UI 비교 12개 주제
    promptKit.ts           # 프롬프트 빌더의 기술 스택·공통 조건
  types/index.ts           # UIItem, UXPattern, Service 등 타입 정의
```

### 새로운 UI 항목 추가 방법

1. `src/types/index.ts`의 `UIItem` 타입을 참고해 `src/data/ui/<카테고리>.ts`에 항목을 추가합니다.
2. `id`는 `ui-` 접두사, `slug`는 URL에 쓰일 고유 문자열로 정합니다.
3. `relatedUxIds`, `relatedUiIds`, `serviceExamples.serviceId`는 실제 존재하는 ID만 사용합니다.
4. `demoType`은 항목마다 하나씩 고유하게 둡니다. `src/types/index.ts`의 `DemoType`에 값을 추가하고, `src/components/demos/`에 데모를 만들어 `InteractiveDemo`의 레지스트리에 등록한 뒤, `MiniPreview`의 `PreviewGlyph`에 같은 모양의 썸네일 도식을 추가합니다. 레지스트리는 `DemoType` 전체를 요구하므로 빠뜨리면 타입 검사에서 걸립니다.
5. `npm run test -- --run`으로 데이터 무결성 검사를 통과하는지 확인합니다.

### 새로운 UX 패턴 추가 방법

1. `src/data/ux/` 아래 해당 분류 배열에 `UXPattern` 객체를 추가합니다.
2. `flowSteps`(대표 흐름)와 `relatedUiIds` 2개 이상은 필수입니다.
3. 무결성 테스트가 ID 오타와 누락을 자동으로 잡아줍니다.

### 헷갈리는 UI 비교 주제 추가 방법

1. `src/data/versus.ts`에 `VersusTopic`을 추가합니다. `uiIds`의 순서와 각 `rows[].values`의 순서가 같아야 합니다.
2. 테스트가 존재하지 않는 UI ID와 값 개수 불일치를 잡아 줍니다. 검색 색인과 UI 상세의 “비교표 보기” 링크는 자동으로 연결됩니다.

### 새로운 서비스 사례 추가 방법

1. `src/data/services.ts`에 `Service` 객체를 추가합니다.
2. UI/UX 항목의 `serviceExamples`에서 해당 `serviceId`를 참조하면 상세 페이지에 사례로 표시됩니다.
3. 로고 이미지는 사용하지 않고 이름 첫 글자 배지로 표시됩니다.

## VibeDic 어시스턴트 (Gemini 연동)

우측 하단 AI 버튼을 누르면 채팅창이 열립니다. 백엔드 없이 브라우저에서 Google Gemini API를 직접 호출합니다. API 키는 두 가지 방법으로 넣을 수 있습니다.

### 1) 환경변수 (권장, 배포용)

빌드 시 `VITE_GEMINI_API_KEY` 환경변수로 키를 주입하면, 사용자는 키 입력 없이 바로 어시스턴트를 쓸 수 있습니다.

- **로컬 개발**: 프로젝트 루트에 `.env.local` 파일을 만들고 `VITE_GEMINI_API_KEY=발급받은키` 를 넣습니다. (`.env.local`은 `.gitignore`로 커밋되지 않습니다.)
- **GitHub Pages 배포**: 저장소 **Settings → Secrets and variables → Actions → Secrets 탭 → New repository secret**에서 이름을 정확히 `VITE_GEMINI_API_KEY`로 등록합니다(워크플로가 같은 이름으로 그대로 읽어 빌드에 주입합니다). 반드시 **Repository secrets**여야 합니다 — **Environments → github-pages** 아래의 Environment secret으로 등록하면 `build` 잡에서 읽지 못합니다.

> 참고: 정적 SPA 특성상 이렇게 주입된 키는 빌드된 JS 번들에 포함되어 브라우저에 노출됩니다. Google AI Studio에서 키에 **HTTP 리퍼러 제한**(예: `vibedic.chichiboo.link/*`)을 걸어 오남용을 막는 것을 권장합니다.

> 주의: `github-pages` 환경은 GitHub가 자동으로 "default 브랜치(`main`)에서만 배포 허용" 규칙을 겁니다. Actions 탭에서 **Run workflow**를 수동 실행할 때는 반드시 브랜치를 `main`으로 선택하세요. 다른 브랜치를 선택해도 배포 잡은 오류 없이 건너뛰어지도록 워크플로에 안전장치가 있습니다.

### 2) 사용자 직접 입력 (환경변수가 없을 때)

환경변수 키가 없으면 어시스턴트 첫 화면에서 [Google AI Studio](https://aistudio.google.com/apikey) 무료 키를 붙여 넣습니다. 이 키는 브라우저 `localStorage`(`vibedic:gemini-api-key`)에만 저장됩니다.

### 모델 폴백 체인

`src/assistant/gemini.ts`의 `MODEL_CHAIN`에 정의된 순서대로 호출하며, 앞 모델이 없거나(미출시·권한 없음) 실패하면 다음 모델로 자동 폴백합니다.

```
Gemini 3.1 Flash Lite → Gemini 3.5 Flash → Gemini 3 Flash → Gemini 2.5 Flash → Gemini 2.5 Flash Lite
```

- 아직 출시되지 않은 상위 모델은 404로 응답하므로 자동으로 건너뛰고, 출시되면 별도 수정 없이 우선 사용됩니다.
- 키 자체가 잘못된 경우에는 폴백하지 않고 즉시 안내합니다.
- 채팅창 헤더의 **배터리 표시등**이 지금 어떤 모델로 대화 중인지 보여줍니다. 상위 모델일수록 눈금이 가득 차고, 폴백될수록 눈금이 줄어듭니다.

### 답변 렌더링

- 시스템 프롬프트에 사전 전체 목록(UI 63개 + UX 43개의 slug·이름·설명)이 포함되어, 모델이 실제 존재하는 항목만 추천합니다.
- 답변 속 `[[ui:slug]]`, `[[ux:slug]]` 표기는 클릭 가능한 사전 링크로 렌더링됩니다.
- 코드 블록으로 제안되는 구현 프롬프트에는 복사 버튼이 붙습니다.
- 채팅 패널은 모바일에서 화면을 거의 채우도록 반응형으로 배치됩니다.

## 저장함과 localStorage

| 키 | 내용 |
| --- | --- |
| `vibedic:saved-items` | 저장함 (`{type: 'ui'\|'ux', id}` 배열) |
| `vibedic:recent-items` | 최근 본 항목 (최대 10개, 중복 제거) |
| `vibedic:recent-searches` | 최근 검색어 (최대 8개) |
| `vibedic:prompt-options` | 프롬프트 빌더에서 고른 기술 스택·공통 조건 |
| `vibedic:theme` | 사용자가 고른 라이트/다크 테마 |
| `vibedic:gemini-api-key` | 어시스턴트용 Gemini API 키 (환경변수 미설정 + 사용자 직접 입력 시에만) |

로그인 없이 브라우저에만 저장되며, `useSyncExternalStore` 기반 훅으로 모든 컴포넌트가 동기화됩니다. localStorage 접근 오류는 안전하게 무시됩니다.

## 디자인 시스템

트렌디한 에디토리얼·테크 무드를 목표로 합니다.

- **색**: 무채색(zinc) 바탕 + 일렉트릭 바이올렛(`primary`) 한 가지 강조색 + 라임(`accent`) 하이라이트. 라이트/다크 값은 `src/styles/index.css`의 CSS 변수로 관리하고 Tailwind 색 이름으로 씁니다. 다크 모드는 거의 검정(`#08080b`)에 가까운 바탕입니다.
- **배경**: 화면 전체에 오로라 빛 번짐(radial gradient)과 필름 그레인(SVG 노이즈)을 고정으로 깔았습니다. 도식 영역은 점 격자(`dot-grid`) 위에 놓입니다.
- **타이포**: 한글은 PretendardGOV, 큰 제목은 굵고 자간을 좁힌 디스플레이 스타일. 영문 이름·머리말·숫자는 Geist Mono, 영문 강조는 Instrument Serif 이탤릭(Google Fonts). 한글이 낱말 중간에서 끊기지 않도록 `word-break: keep-all`.
- **레이아웃**: 화면 위에 떠 있는 유리(glass) 섬 헤더, 홈의 벤토 그리드, 번호가 붙은 섹션 머리말(01 — …), 흐르는 용어 띠(마키), 거대 워드마크 푸터.
- **인터랙션**: 카드 위에서 마우스를 따라오는 스포트라이트(`spotlight`), 호버 시 살짝 떠오르는 카드와 확대되는 도식, 히어로의 떠다니는 스티커 카드. `prefers-reduced-motion`이면 모든 움직임을 끕니다.
- **컴포넌트 클래스**: `btn-primary`(글자·바탕을 뒤집은 잉크 버튼), `btn-accent`, `btn-secondary`, `pill`(`aria-pressed="true"`면 잉크로 채워짐), `surface-card`, `glass`, `eyebrow`, `text-gradient`, `dot-grid`.
- **분류 색**: `tone-*` 클래스를 주면 그 안에서 `bg-tone`/`text-tone-fg`가 해당 분류 색이 됩니다. 분류별 아이콘·색 짝은 `src/components/dictionary/categoryVisuals.ts`.
- 빌드 시 React·라우터와 기타 라이브러리를 별도 청크로 나눠, 콘텐츠만 바뀐 배포에서도 라이브러리는 브라우저 캐시를 재사용합니다.

## 접근성 구현

- `header` / `nav` / `main` / `section` / `footer` 시맨틱 구조와 본문 바로가기 링크
- 모달·바텀 시트: 포커스 트랩, ESC 닫기, 닫힌 뒤 원래 버튼으로 포커스 복귀
- 탭 컴포넌트: `role=tablist/tab/tabpanel`, 화살표 키 이동, `aria-selected`
- 빠른 검색: `role=combobox` + `listbox`/`option`, `aria-activedescendant`로 현재 선택 항목 전달, 입력 중에는 `/` 단축키를 가로채지 않음
- 상세 목차: HashRouter와 충돌하지 않도록 앵커 대신 버튼으로 스크롤하고 해당 구획으로 포커스 이동
- 아이콘 버튼 전체에 `aria-label`, 터치 영역 최소 44px
- 검색 결과 수와 토스트에 `role="status"` / `aria-live` 적용
- 오류 필드와 메시지를 `aria-describedby`로 연결
- `:focus-visible` 스타일과 `prefers-reduced-motion` 대응
- 상태를 색상만으로 구분하지 않음 (텍스트·아이콘 병행)

## 저작권과 상표 안내

서비스 및 상표의 권리는 각 권리자에게 있습니다. VibeDic은 UI·UX 학습을 위해 공개적으로 관찰 가능한 사례를 설명합니다. 유명 서비스의 화면을 복제하거나 로고 이미지를 저장소에 포함하지 않습니다.

## 추후 서버·API 영역 확장 방법

콘텐츠와 화면 코드가 분리되어 있어, 다음 파일을 추가하는 방식으로 확장할 수 있습니다.

```text
src/data/serverItems.ts
src/data/apiItems.ts
src/data/databaseItems.ts
src/data/securityItems.ts
```

`UIItem`과 같은 구조(이름, 요약, 사례, 프롬프트, 관련 항목)를 재사용하고, 새 카테고리 메타데이터와 라우트(`#/server`, `#/api`)를 추가하면 됩니다. 현재 버전에서는 준비 중 메뉴나 빈 페이지를 노출하지 않습니다.

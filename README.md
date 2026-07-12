# VibeDic

**필요할 때 꺼내 찾는 바이브코딩 UI·UX 사전**

VibeDic은 바이브코딩으로 웹사이트와 애플리케이션을 만드는 사람이 UI 요소의 공식 명칭과 역할을 쉽게 찾아보고, 실제 유명 서비스에서 어떻게 사용되는지 확인하며, 관련 UX 패턴과 PC·태블릿·모바일 환경의 차이를 이해할 수 있도록 돕는 사례 기반 학습 웹앱입니다.

- 배포 주소: https://chichiboo123.github.io/vibedic/

## 핵심 콘셉트

```text
궁금한 UI 또는 UX를 검색한다.
→ 공식 명칭과 역할을 확인한다.
→ 유명 서비스의 사용 사례를 살펴본다.
→ PC·태블릿·모바일의 차이를 비교한다.
→ 내 웹앱에 적용할 프롬프트를 복사한다.
→ 필요하면 저장함에 보관한다.
```

## 주요 기능

- **UI 사전 (63개 항목, 6개 분류)** — 화면 나누기 / 이동하기 / 누르고 선택하기 / 입력하기 / 정보 보여주기 / 상태 알려주기
- **UX 사전 (37개 패턴, 8개 분류)** — 찾기 / 입력하기 / 선택하기 / 이동하기 / 실행하고 확인하기 / 기다리고 이해하기 / 공유하고 협업하기 / 시작하고 익숙해지기
- **인터랙티브 데모 (27종)** — 버튼, 토글, 모달, 바텀 시트, 날짜 선택기 등 주요 UI를 직접 조작
- **유명 서비스 16개 + 사례 도식** — 서비스 화면을 단순화한 CSS 와이어프레임 위에 해당 요소가 쓰이는 자리를 강조해 표시 (스크린샷·로고 미사용)
- **기기별 비교 12가지 주제** — 사이드바 vs 하단 내비게이션, 모달 vs 바텀 시트 등
- **통합 검색** — 한글/영문/부분 일치/띄어쓰기 차이 대응, 최근 검색어, 결과 유형 표시
- **저장함 & 최근 본 항목** — 로그인 없이 `localStorage`로 관리
- **바이브코딩 프롬프트 복사** — 모든 항목에 AI에게 바로 붙여 넣을 수 있는 프롬프트 제공
- **VibeDic 어시스턴트 (Gemini)** — 우측 하단 플로팅 버튼으로 여는 AI 채팅. 상황을 설명하면 사전 항목을 링크로 추천하고 구현용 프롬프트를 제안

## 화면 구조

| 라우트 | 화면 |
| --- | --- |
| `#/` | 홈 (히어로, 통합 검색, 추천 항목) |
| `#/ui`, `#/ui/:slug` | UI 요소 목록·상세 |
| `#/ux`, `#/ux/:slug` | UX 패턴 목록·상세 |
| `#/services`, `#/services/:slug` | 유명 서비스 목록·상세 |
| `#/compare` | 기기별 비교 |
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
- Vitest + React Testing Library
- ESLint 9
- GitHub Actions → GitHub Pages 배포

백엔드, 외부 API, 로그인, 데이터베이스는 사용하지 않습니다. 모든 콘텐츠는 TypeScript 정적 데이터로 관리합니다.

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

`vite.config.ts`의 `base: '/vibedic/'` 설정으로 GitHub Pages 프로젝트 경로에서 에셋이 정상 로드됩니다.

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
  types/index.ts           # UIItem, UXPattern, Service 등 타입 정의
```

### 새로운 UI 항목 추가 방법

1. `src/types/index.ts`의 `UIItem` 타입을 참고해 `src/data/ui/<카테고리>.ts`에 항목을 추가합니다.
2. `id`는 `ui-` 접두사, `slug`는 URL에 쓰일 고유 문자열로 정합니다.
3. `relatedUxIds`, `relatedUiIds`, `serviceExamples.serviceId`는 실제 존재하는 ID만 사용합니다.
4. 인터랙티브 데모가 필요하면 `demoType`을 기존 값 중에서 고르거나, `src/components/demos/`에 데모를 추가하고 레지스트리에 등록합니다.
5. `npm run test -- --run`으로 데이터 무결성 검사를 통과하는지 확인합니다.

### 새로운 UX 패턴 추가 방법

1. `src/data/ux/` 아래 해당 분류 배열에 `UXPattern` 객체를 추가합니다.
2. `flowSteps`(대표 흐름)와 `relatedUiIds` 2개 이상은 필수입니다.
3. 무결성 테스트가 ID 오타와 누락을 자동으로 잡아줍니다.

### 새로운 서비스 사례 추가 방법

1. `src/data/services.ts`에 `Service` 객체를 추가합니다.
2. UI/UX 항목의 `serviceExamples`에서 해당 `serviceId`를 참조하면 상세 페이지에 사례로 표시됩니다.
3. 로고 이미지는 사용하지 않고 이름 첫 글자 배지로 표시됩니다.

## VibeDic 어시스턴트 (Gemini 연동)

우측 하단 AI 버튼을 누르면 채팅창이 열립니다. 백엔드 없이 동작하므로 **사용자 본인의 Google Gemini API 키**가 필요합니다.

1. [Google AI Studio](https://aistudio.google.com/apikey)에서 무료 API 키를 발급받습니다.
2. 어시스턴트 첫 화면에 키를 붙여 넣고 연결합니다.
3. 키는 브라우저 `localStorage`(`vibedic:gemini-api-key`)에만 저장되며, 요청은 브라우저에서 Google API로 직접 전송됩니다. VibeDic 서버는 존재하지 않습니다.

동작 방식:

- 시스템 프롬프트에 사전 전체 목록(UI 63개 + UX 37개의 slug·이름·설명)이 포함되어, 모델이 실제 존재하는 항목만 추천합니다.
- 답변 속 `[[ui:slug]]`, `[[ux:slug]]` 표기는 클릭 가능한 사전 링크로 렌더링됩니다.
- 코드 블록으로 제안되는 구현 프롬프트에는 복사 버튼이 붙습니다.
- 사용 모델은 `src/assistant/gemini.ts`의 `GEMINI_MODEL` 상수(`gemini-2.5-flash`)로 변경할 수 있습니다.

## 저장함과 localStorage

| 키 | 내용 |
| --- | --- |
| `vibedic:saved-items` | 저장함 (`{type: 'ui'\|'ux', id}` 배열) |
| `vibedic:recent-items` | 최근 본 항목 (최대 10개, 중복 제거) |
| `vibedic:recent-searches` | 최근 검색어 (최대 8개) |
| `vibedic:gemini-api-key` | 어시스턴트용 Gemini API 키 (사용자 입력 시에만) |

로그인 없이 브라우저에만 저장되며, `useSyncExternalStore` 기반 훅으로 모든 컴포넌트가 동기화됩니다. localStorage 접근 오류는 안전하게 무시됩니다.

## 접근성 구현

- `header` / `nav` / `main` / `section` / `footer` 시맨틱 구조와 본문 바로가기 링크
- 모달·바텀 시트: 포커스 트랩, ESC 닫기, 닫힌 뒤 원래 버튼으로 포커스 복귀
- 탭 컴포넌트: `role=tablist/tab/tabpanel`, 화살표 키 이동, `aria-selected`
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

# 보일러플레이트 개발 가이드 (CONTRIBUTING)

> **대상**: `d2a-boilerplate-claude` **자체를 수정·개선**하려는 팀원
> (스킬·훅·CLAUDE.md·MCP 서버·정책 참조를 디벨롭하는 사람)

> ⚠️ 이 문서는 **보일러플레이트로 새 프로젝트를 만드는 방법이 아닙니다.**
> 파생 프로젝트를 만들려면 [README.md](README.md)의 "파생 프로젝트 빠른 시작" 또는
> [template/SETUP.md](template/SETUP.md)를 보세요.

---

## TL;DR (한눈에)

```bash
# 1. Clone
git clone https://gitlab.nexon.com/frontdev/inhouse/replatform-playground/d2a-boilerplate-claude.git
cd d2a-boilerplate-claude

# 2. 워크스페이스 열기 (⚠️ 레포 루트를 직접 열지 말 것)
code d2a.code-workspace

# 3. MCP 서버 의존성 설치 + 빌드
cd template/d2a-mcp-server && npm install && npm run build && cd ../..

# 4. 작업 브랜치 따기
git switch -c feature/내-작업-이름

# 5. template/ 하위에서 수정 → 검증 → 커밋
bash tests/run-all-tests.sh --skip-e2e
git add <변경 파일> && git commit -m "feat: 요약"

# 6. 푸시 후 GitLab에서 MR 생성
git push -u origin feature/내-작업-이름
```

---

## 0. 사전 요구사항

| 항목 | 최소 버전 | 확인 방법 | 비고 |
|---|---|---|---|
| [Claude Code](https://claude.ai/code) | 최신 | `claude --version` | 스킬·훅 동작 검증용 |
| Node.js | v20 이상 | `node --version` | MCP 서버 빌드·테스트 |
| Git | 2.x 이상 | `git --version` | `git switch` 사용 |
| Python 3 | 3.x | `python3 --version` | `lint-claude-md.py` 등 검증 스크립트 |
| GitLab 계정 | — | — | 저장소 read/write 권한 |

> Claude Code CLI 설치: `npm install -g @anthropic-ai/claude-code`

---

## 1. Clone

```bash
git clone https://gitlab.nexon.com/frontdev/inhouse/replatform-playground/d2a-boilerplate-claude.git
cd d2a-boilerplate-claude
```

> 사내 GitLab은 `curl` archive 방식을 지원하지 않으므로 반드시 **`git clone`** 으로 받습니다.
> HTTPS 인증이 안 되면 GitLab → 아바타 → **Edit profile → Access Tokens** 에서
> `read_repository` + `write_repository` 스코프 토큰을 발급해 사용하세요.

---

## 2. 워크스페이스 열기 (가장 중요)

레포를 수정할 때는 **반드시 `d2a.code-workspace`** 로 엽니다.

```bash
code d2a.code-workspace
```

워크스페이스를 열면 탐색기에 두 영역이 동시에 표시됩니다.

```
📦 TEMPLATE (설치 대상)          🔧 BOILERPLATE-META (개발 전용)
├── .claude/skills/              ├── tests/
├── scripts/                     ├── docs/
├── refs/                        ├── README.md
├── d2a-mcp-server/              └── MIGRATION.md
└── CLAUDE.md
```

- **첫 번째 폴더(`template/`)가 Claude Code의 워크스페이스 루트**가 됩니다 →
  hooks·skills·MCP가 전부 정상 작동합니다.
- `tests/`, `docs/` 등 레포 전용 파일은 두 번째 폴더에서 탐색기로 바로 접근합니다.

> ### ⛔ 레포 루트를 직접 열지 마세요
> `CLAUDE.md`·`.claude/`·`.mcp.json`이 모두 `template/` **안**에 있습니다.
> VS Code에서 레포 루트 폴더를 그냥 열면 Claude Code가 이 파일들을 인식하지 못해
> **스킬·훅·MCP가 전부 작동하지 않습니다.**
>
> - ✅ `code d2a.code-workspace` (권장)
> - ✅ `template/` 폴더를 직접 열기 (검증 스크립트는 레포 루트 터미널에서 별도 실행)
> - ❌ 레포 루트 폴더를 워크스페이스로 열기

---

## 3. 의존성 설치 + MCP 서버 빌드

MCP 서버(`template/d2a-mcp-server/`)는 TypeScript로 작성돼 있어 빌드가 필요합니다.

```bash
cd template/d2a-mcp-server
npm install
npm run build      # dist/ 생성 — Phase 게이트·done 검증·체크포인트 도구
npm test           # MCP 단위 테스트 (vitest) — 환경 확인용
cd ../..
```

> `dist/`는 레포에 커밋되어 있지만(파생 프로젝트가 빌드 없이 쓸 수 있도록),
> `src/`를 수정했다면 **반드시 `npm run build`로 `dist/`를 다시 생성**한 뒤 커밋합니다.

---

## 4. 작업 브랜치 따기

`main`은 보호 브랜치입니다. **직접 푸시하지 말고** 항상 작업 브랜치를 따서 MR로 병합합니다.

```bash
git switch main && git pull          # 최신 main 동기화
git switch -c feature/작업-이름       # 새 작업 브랜치 생성
```

### 브랜치 네이밍 컨벤션

| 접두사 | 용도 | 예시 |
|---|---|---|
| `feature/` | 새 스킬·훅·기능 추가 | `feature/add-rollback-skill` |
| `fix/` | 버그 수정 | `fix/run-phase-gate-check` |
| `docs/` | 문서만 변경 | `docs/contributing-guide` |
| `refactor/` | 동작 변경 없는 구조 개선 | `refactor/mcp-server-handlers` |
| `chore/` | 빌드·설정·잡무 | `chore/bump-deps` |

- 슬래시 뒤는 **kebab-case**, 영어 소문자로 짧고 명확하게.
- 이슈 번호가 있으면 뒤에 붙입니다: `feature/add-skill-#42`

---

## 5. 어디를 수정하나 (디렉터리 맵)

> **수정 대상은 거의 항상 `template/` 하위입니다.** 레포 루트 파일(README·tests 등)은
> 보일러플레이트 메타 영역으로, 파생 프로젝트에는 전달되지 않습니다.

| 무엇을 바꾸나 | 경로 | 메모 |
|---|---|---|
| 슬래시 커맨드 스킬 | `template/.claude/skills/{name}.md` | 18개. 추가/수정 모두 여기 |
| AI 지침서 | `template/CLAUDE.md` | 헌법·행동 규칙·언어 설정 |
| 권한·훅 설정 | `template/.claude/settings.json` | hooks 추가 시 |
| 훅·유틸 스크립트 | `template/scripts/*.sh`, `*.py` | `pre-write-hook.sh` 등 |
| MCP 서버 로직 | `template/d2a-mcp-server/src/` | 수정 후 `npm run build` 필수 |
| 정책 참조 | `template/refs/` | `INDEX.md`, `policies/` 등 |
| spec/plan/tasks 템플릿 | `template/specs/.template/` | 버전 변경 시 `VERSION` 갱신 |
| 검증 스크립트 (메타) | `tests/*.sh` | 보일러플레이트 자체 검증 — 파생 전달 안 됨 |
| 레포 문서 (메타) | `README.md`, `MIGRATION.md`, `docs/` | 파생 전달 안 됨 |

> 자세한 전체 구조는 [README.md](README.md)의 "디렉터리 구조"를 참고하세요.

---

## 6. 검증 (커밋 전 필수)

레포 **루트 터미널**에서 전체 검증 스위트를 실행합니다.

```bash
# 빠른 검증 (워크트리 E2E 생략 — 평상시 권장)
bash tests/run-all-tests.sh --skip-e2e

# 전체 검증 (병합 직전 또는 큰 변경 시)
bash tests/run-all-tests.sh
```

검증 스위트 구성:

| 레벨 | 스크립트 | 검사 내용 |
|---|---|---|
| L1+L2 | `validate-boilerplate.sh` | 정적 구조 + 훅 단위 |
| L2b | `lint-claude-md.py` | CLAUDE.md 정적 분석 |
| L3 | `validate-artifacts.sh` | 스킬 결과물 계약 |
| L3b | `check-invariants.sh` | 불변 조건 |
| L4a | `validate-feedback-loops.sh` | 피드백 루프 계약 |
| L4b | `test-fresh-install.sh` | 워크트리 격리 E2E (`--skip-e2e`로 생략) |
| L4c | `chaos-test.sh` | 장애 주입 |
| L4d | `validate-traces.sh` | MCP 호출 시퀀스 |
| L5 | `d2a-mcp-server npm test` | MCP 단위 테스트 |

> 종료 코드 `0` = 전체 통과, `1` = 하나 이상 실패. 실패 항목을 고친 뒤 다시 실행하세요.

---

## 7. 커밋 → 푸시 → MR

### 7-1. 커밋 (Conventional Commits)

경로는 워크스페이스 기준으로 입력해도 git이 내부적으로 `template/...`로 추적합니다.

```bash
git add template/.claude/skills/run-phase.md
git commit -m "feat: run-phase 게이트 검증 보강"
```

커밋 타입: `feat` / `fix` / `docs` / `refactor` / `chore` / `test` / `revert`

### 7-2. 푸시

```bash
git push -u origin feature/작업-이름
```

### 7-3. Merge Request 생성

1. 푸시 후 출력되는 MR 링크를 열거나, GitLab 저장소 → **Merge requests → New** 로 생성합니다.
2. Source = `feature/작업-이름`, Target = `main`
3. 제목·설명에 변경 요약과 검증 결과(`run-all-tests.sh` 통과 여부)를 적습니다.
4. **CI 파이프라인이 자동 실행**됩니다 ([.gitlab-ci.yml](.gitlab-ci.yml)):
   - `boilerplate-structure` (구조 검증)
   - `mcp-unit-tests` (MCP 단위 테스트)
   - `feedback-loop-contracts` (피드백 루프 + 아티팩트 계약)
   - `fresh-install-e2e` (main 병합 시 또는 수동 실행)
5. CI 통과 + 리뷰 승인 후 병합합니다.

> 로컬에서 `run-all-tests.sh --skip-e2e`가 통과해야 CI에서도 대부분 통과합니다.
> MR 올리기 **전에** 로컬 검증을 먼저 끝내는 것을 권장합니다.

---

## 8. 자주 겪는 문제

| 증상 | 원인 / 해결 |
|---|---|
| 스킬·훅·MCP가 작동 안 함 | 레포 루트를 직접 열었기 때문 → `d2a.code-workspace`로 다시 열고 **VS Code 완전 종료(Cmd+Q) 후 재실행** |
| MCP 도구가 안 보임 | `template/d2a-mcp-server`에서 `npm install && npm run build` 누락 → 빌드 후 새 채팅 |
| `run-all-tests.sh` L5 실패 | `template/d2a-mcp-server`에서 `npm install` 안 된 상태 |
| `lint-claude-md.py` 실행 안 됨 | `python3` 미설치 — 사전 요구사항 확인 |
| `main`에 푸시 거부됨 | `main`은 보호 브랜치 — 작업 브랜치를 따서 MR로 병합 |

> 스킬 로딩 관련 상세 트러블슈팅은 [template/SETUP.md](template/SETUP.md)의 "트러블슈팅" 섹션을 참고하세요.

---

## 참고 문서

| 문서 | 용도 |
|---|---|
| [README.md](README.md) | 레포 개요·디렉터리 구조·스킬 목록 |
| [MIGRATION.md](MIGRATION.md) | `template/` 구조 전환 배경 및 개발 방식 변화 |
| [template/CLAUDE.md](template/CLAUDE.md) | AI 지침서 (헌법 + 행동 규칙) |
| [template/SETUP.md](template/SETUP.md) | 파생 프로젝트 설치·트러블슈팅 |
| [.gitlab-ci.yml](.gitlab-ci.yml) | CI 파이프라인 정의 |

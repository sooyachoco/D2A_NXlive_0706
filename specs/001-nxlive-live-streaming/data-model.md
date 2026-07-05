# 데이터 모델 — NXlive

> 현재는 Mock(프론트 메모리). 아래는 Step 2.8 확정 타입(`frontend/types/index.ts`) 기준이며,
> Phase 2에서 실제 DB 스키마로 역설계한다. 인증 없음(none)이라 User는 최소화.

## 엔티티

### Channel (스트리머 채널)
| 필드 | 타입 | 설명 |
|---|---|---|
| id | string (PK) | 채널 ID |
| name | string | 스트리머명 |
| followers | number | 팔로워 수 |
| about | string | 소개 |
| live | boolean | 방송 중 여부 |
| gameKey | GameKey | 주력 게임 |

### Live (라이브 방송)
| 필드 | 타입 | 설명 |
|---|---|---|
| id | string (PK) | 라이브 ID (= channelId 기준) |
| channelId | string (FK→Channel) | 채널 |
| channelName | string | 채널명(비정규화) |
| title | string | 방송 제목 |
| gameKey | GameKey | 게임 |
| viewers | number | 현재 시청자 수 |
| followers | number | 채널 팔로워(표시용) |
| category | string | 게임명(표시용) |

### Clip (하이라이트 VOD)
| 필드 | 타입 | 설명 |
|---|---|---|
| id | string (PK) | 클립 ID |
| channelId | string (FK→Channel) | 채널 |
| channelName | string | 채널명 |
| title | string | 제목 |
| gameKey | GameKey | 게임 |
| views | number | 조회수 |
| duration | string | 길이 "mm:ss" |

### ChatMessage (실시간 채팅 — Mock 시뮬)
| 필드 | 타입 | 설명 |
|---|---|---|
| id | string (PK) | 메시지 ID |
| user | string | 작성자명 |
| text | string | 내용 |
| color | string? | 닉네임 색(선택) |

### GameKey (열거)
`maple | dnf | fc | sudden | blue | kart | mabi | baram`

## 관계

```
Channel 1 ──< Live   (채널당 현재 라이브 0~1)
Channel 1 ──< Clip   (채널당 클립 N)
Live    1 ──< ChatMessage (라이브당 채팅 N — 현재 클라이언트 메모리)
```

## Phase 2 전환 노트
- viewers/채팅은 실시간(WebSocket) 소스로 교체.
- 팔로우는 인증 도입 시 User↔Channel N:M 테이블로. 현재는 로컬(Zustand) 상태.

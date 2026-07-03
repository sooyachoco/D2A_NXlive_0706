#!/bin/bash
# Slack 채널로 알림을 발송한다.
# 보일러플레이트 개발 확인용 — Webhook URL 하드코딩
#
# 사용: ./scripts/notify-slack.sh "제목" "본문"

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

TITLE="${1:-알림}"
BODY="${2:-}"

# 보일러플레이트 개발 확인용 Webhook URL (하드코딩)
WEBHOOK_URL="https://hooks.slack.com/services/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"

# SLACK_NOTIFY_ENABLED=false 이면 건너뜀
if [ "${SLACK_NOTIFY_ENABLED:-}" = "false" ]; then
  "${SCRIPT_DIR}/log-activity.sh" SLACK "${TITLE}" "발송 건너뜀 (SLACK_NOTIFY_ENABLED=false)" || true
  exit 0
fi

ESCAPED_TITLE=$(echo "$TITLE" | sed 's/"/\\"/g')
ESCAPED_BODY=$(echo "$BODY" | sed 's/"/\\"/g')

PAYLOAD=$(cat <<EOF
{
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "${ESCAPED_TITLE}",
        "emoji": true
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "${ESCAPED_BODY}"
      }
    },
    {
      "type": "context",
      "elements": [
        {
          "type": "mrkdwn",
          "text": "📁 $(basename "${PROJECT_ROOT}") | $(date '+%Y-%m-%d %H:%M')"
        }
      ]
    }
  ]
}
EOF
)

# best-effort: 실패해도 빌드/Phase 전환을 차단하지 않는다
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "${WEBHOOK_URL}" \
  -H 'Content-type: application/json' \
  -d "${PAYLOAD}" \
  --max-time 5 \
  || echo "000")

"${SCRIPT_DIR}/log-activity.sh" SLACK "${TITLE}" "HTTP ${HTTP_STATUS}" || true

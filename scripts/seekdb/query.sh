#!/usr/bin/env bash
# Query the resume_knowledge SeekDB collection.
#
# Runs hybrid (fulltext + semantic) search when a query string is provided,
# scalar (metadata) search when only --where is provided, or both combined.
#
# Examples:
#   ./query.sh "who has hands-on OceanBase experience?"
#   ./query.sh "hybrid retrieval and reranking"
#   ./query.sh "Japanese language ability"
#   ./query.sh --info
#   ./query.sh --list
#   ./query.sh --where '{"category":{"$eq":"Selected Project"}}' "agent framework"
#
# Env:
#   SEEKDB_COLLECTION   override collection name (default: resume_knowledge)
#   SEEKDB_QUERY_SCRIPT override path to query_from_seekdb.py

set -euo pipefail

COLLECTION="${SEEKDB_COLLECTION:-resume_knowledge}"

QUERY_SCRIPT="${SEEKDB_QUERY_SCRIPT:-}"
if [[ -z "$QUERY_SCRIPT" ]]; then
  QUERY_SCRIPT="$(ls -1 "$HOME"/.qoder/plugins/cache/qoder-marketplace/oceanbase-skills/*/skills/seekdb/querying/scripts/query_from_seekdb.py 2>/dev/null | sort -V | tail -n1 || true)"
fi

if [[ ! -f "$QUERY_SCRIPT" ]]; then
  echo "error: could not locate query_from_seekdb.py. Set SEEKDB_QUERY_SCRIPT." >&2
  exit 1
fi

# Fast-path convenience flags
if [[ "${1:-}" == "--list" ]]; then
  exec python3 "$QUERY_SCRIPT" --list-collections
fi
if [[ "${1:-}" == "--info" ]]; then
  exec python3 "$QUERY_SCRIPT" "$COLLECTION" --info
fi

# Support optional --where <json> [text]
WHERE=""
if [[ "${1:-}" == "--where" ]]; then
  WHERE="$2"
  shift 2
fi

TEXT="${1:-}"
N="${SEEKDB_N_RESULTS:-5}"

ARGS=("$COLLECTION" "--n-results" "$N")
if [[ -n "$WHERE" ]]; then
  ARGS+=("--where" "$WHERE")
fi
if [[ -n "$TEXT" ]]; then
  ARGS+=("--query-text" "$TEXT")
fi

if [[ -z "$WHERE" && -z "$TEXT" ]]; then
  echo "usage: $0 [--info | --list | --where <json>] [query text]" >&2
  exit 2
fi

python3 "$QUERY_SCRIPT" "${ARGS[@]}"

#!/usr/bin/env bash
# Import resume knowledge into SeekDB as a vector collection.
#
# Uses the OceanBase / SeekDB Qoder skill's import_to_seekdb.py under the hood.
# The `content` column is vectorized (all-MiniLM-L6-v2, 384-dim) so the resulting
# collection supports hybrid fulltext + semantic search.
#
# Prereqs (one-time):
#   pip install pyseekdb pandas openpyxl
#
# Storage: embedded mode by default, files under ~/.seekdb
# Override with:
#   SEEKDB_HOST=... SEEKDB_PORT=... SEEKDB_USER=... SEEKDB_PASSWORD=... ./import.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
CSV_FILE="${1:-$REPO_ROOT/data/resume_knowledge.csv}"
COLLECTION="${SEEKDB_COLLECTION:-resume_knowledge}"

# Resolve the skill's importer. Allow override, else glob-find the installed plugin.
IMPORT_SCRIPT="${SEEKDB_IMPORT_SCRIPT:-}"
if [[ -z "$IMPORT_SCRIPT" ]]; then
  IMPORT_SCRIPT="$(ls -1 "$HOME"/.qoder/plugins/cache/qoder-marketplace/oceanbase-skills/*/skills/seekdb/importing/scripts/import_to_seekdb.py 2>/dev/null | sort -V | tail -n1 || true)"
fi

if [[ ! -f "$IMPORT_SCRIPT" ]]; then
  cat >&2 <<EOF
error: could not locate the SeekDB importer script.

Install the OceanBase Qoder plugin, or set SEEKDB_IMPORT_SCRIPT to the path of
import_to_seekdb.py, e.g.:

  export SEEKDB_IMPORT_SCRIPT=/path/to/oceanbase-skills/.../seekdb/importing/scripts/import_to_seekdb.py
EOF
  exit 1
fi

if [[ ! -f "$CSV_FILE" ]]; then
  echo "error: CSV not found: $CSV_FILE" >&2
  exit 1
fi

echo "importer  : $IMPORT_SCRIPT"
echo "csv       : $CSV_FILE"
echo "collection: $COLLECTION"
echo "vectorize : content (all-MiniLM-L6-v2, 384-d)"
echo

python3 "$IMPORT_SCRIPT" import "$CSV_FILE" \
  --vectorize-column content \
  --collection "$COLLECTION"

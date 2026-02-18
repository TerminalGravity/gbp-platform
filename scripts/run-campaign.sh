#!/bin/bash
# GBP Campaign Runner
# Actually executes a campaign with a real agent

set -e

# Usage: ./run-campaign.sh "Your objective here"
OBJECTIVE="${1:-Take a screenshot of google.com}"

echo "═══════════════════════════════════════════════════════════════"
echo "  GBP Campaign Runner"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Objective: $OBJECTIVE"
echo ""

# Config
CAMPAIGN_ID="campaign-$(date +%s)"
AGENT_HOST="${AGENT_HOST:-ugc-factory-01}"
OUTPUT_DIR="./campaigns/$CAMPAIGN_ID"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Save campaign config
cat > "$OUTPUT_DIR/config.json" << EOF
{
  "id": "$CAMPAIGN_ID",
  "objective": "$OBJECTIVE",
  "status": "running",
  "started_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "agent_host": "$AGENT_HOST"
}
EOF

echo "[1/3] Starting agent on $AGENT_HOST..."

# Check for API key
if [ -z "$ANTHROPIC_API_KEY" ]; then
    # Try to load from environment file
    if [ -f ~/.env.anthropic ]; then
        source ~/.env.anthropic
    fi
fi

if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo "Error: ANTHROPIC_API_KEY not set"
    echo "Export it or create ~/.env.anthropic"
    exit 1
fi

# Run the agent
echo "[2/3] Executing task..."
echo "────────────────────────────────────────────────────────────────"

ssh root@$AGENT_HOST "
    export DISPLAY=:10
    export ANTHROPIC_API_KEY='$ANTHROPIC_API_KEY'
    
    # Run agent with timeout
    timeout 300 python3 /root/computer_use_agent.py --max-iterations 10 '$OBJECTIVE' 2>&1
" | tee "$OUTPUT_DIR/agent.log"

echo "────────────────────────────────────────────────────────────────"

# Get screenshots from agent
echo "[3/3] Collecting artifacts..."
scp "root@$AGENT_HOST:/tmp/screenshot_*.png" "$OUTPUT_DIR/" 2>/dev/null || echo "No screenshots found"

# Update status
cat > "$OUTPUT_DIR/config.json" << EOF
{
  "id": "$CAMPAIGN_ID",
  "objective": "$OBJECTIVE",
  "status": "complete",
  "started_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "completed_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "agent_host": "$AGENT_HOST",
  "artifacts": $(ls -1 "$OUTPUT_DIR"/*.png 2>/dev/null | jq -R -s -c 'split("\n") | map(select(length > 0))' || echo '[]')
}
EOF

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  CAMPAIGN COMPLETE"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Results: $OUTPUT_DIR/"
ls -la "$OUTPUT_DIR/"
echo ""

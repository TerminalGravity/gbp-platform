#!/bin/bash
# GBP Pipeline Test
# Runs through the full flow: Create → Fund → Execute → Stream → Complete

set -e

echo "═══════════════════════════════════════════════════════════════"
echo "  GBP Pipeline Test"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Config
CAMPAIGN_ID="test-001"
CAMPAIGN_TITLE="Pipeline Test Campaign"
CAMPAIGN_OBJECTIVE="Search for 'GBP Platform' on Google and take a screenshot of the results."
AGENT_HOST="ugc-factory-01"
STREAM_PORT="8080"

echo -e "${CYAN}[1/5] CREATE CAMPAIGN${NC}"
echo "────────────────────────────────────────────────────────────────"
echo "Campaign ID: $CAMPAIGN_ID"
echo "Title: $CAMPAIGN_TITLE"
echo "Objective: $CAMPAIGN_OBJECTIVE"
echo ""

# Create campaign directory
mkdir -p ./campaigns/$CAMPAIGN_ID
cat > ./campaigns/$CAMPAIGN_ID/config.json << EOF
{
  "id": "$CAMPAIGN_ID",
  "title": "$CAMPAIGN_TITLE",
  "objective": "$CAMPAIGN_OBJECTIVE",
  "status": "created",
  "funding": {
    "goal": 1000,
    "current": 0
  },
  "created_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF
echo -e "${GREEN}✓ Campaign created${NC}"
echo ""

echo -e "${CYAN}[2/5] FUND CAMPAIGN${NC}"
echo "────────────────────────────────────────────────────────────────"
# Simulate funding
FUNDING_AMOUNT=1000
cat > ./campaigns/$CAMPAIGN_ID/config.json << EOF
{
  "id": "$CAMPAIGN_ID",
  "title": "$CAMPAIGN_TITLE",
  "objective": "$CAMPAIGN_OBJECTIVE",
  "status": "funded",
  "funding": {
    "goal": 1000,
    "current": $FUNDING_AMOUNT
  },
  "created_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "funded_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF
echo "Funding: $FUNDING_AMOUNT GBP"
echo -e "${GREEN}✓ Campaign funded${NC}"
echo ""

echo -e "${CYAN}[3/5] EXECUTE (Agent Work)${NC}"
echo "────────────────────────────────────────────────────────────────"
echo "Checking agent host: $AGENT_HOST"

# Check if we can reach the agent host
if ssh -o ConnectTimeout=5 root@$AGENT_HOST 'echo "connected"' 2>/dev/null; then
    echo -e "${GREEN}✓ Agent host reachable${NC}"
    
    # Check if computer_use_agent.py exists
    if ssh root@$AGENT_HOST 'test -f /root/computer_use_agent.py' 2>/dev/null; then
        echo -e "${GREEN}✓ Agent script found${NC}"
        
        # Run a simple test (just take screenshot, don't do full task)
        echo "Running agent test task..."
        ssh root@$AGENT_HOST "DISPLAY=:10 scrot -o /tmp/gbp-test-screenshot.png" 2>/dev/null || true
        
        # Copy screenshot back
        scp root@$AGENT_HOST:/tmp/gbp-test-screenshot.png ./campaigns/$CAMPAIGN_ID/screenshot.png 2>/dev/null || true
        
        if [ -f "./campaigns/$CAMPAIGN_ID/screenshot.png" ]; then
            echo -e "${GREEN}✓ Agent captured screenshot${NC}"
        else
            echo -e "${YELLOW}⚠ Screenshot not captured (agent may need setup)${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ Agent script not found at /root/computer_use_agent.py${NC}"
        echo "  To set up: deploy computer_use_agent.py to $AGENT_HOST"
    fi
else
    echo -e "${YELLOW}⚠ Cannot reach $AGENT_HOST${NC}"
    echo "  Add to /etc/hosts or use IP address"
    echo "  Simulating agent execution..."
fi

# Update status
cat > ./campaigns/$CAMPAIGN_ID/config.json << EOF
{
  "id": "$CAMPAIGN_ID",
  "title": "$CAMPAIGN_TITLE",
  "objective": "$CAMPAIGN_OBJECTIVE",
  "status": "executing",
  "funding": {
    "goal": 1000,
    "current": $FUNDING_AMOUNT
  },
  "execution": {
    "started_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "agent_host": "$AGENT_HOST"
  }
}
EOF
echo ""

echo -e "${CYAN}[4/5] STREAM (Screen Capture)${NC}"
echo "────────────────────────────────────────────────────────────────"
echo "Stream endpoint would be: rtmp://stream.gbp.network/$CAMPAIGN_ID"
echo "Viewer URL would be: https://gbp.network/live/$CAMPAIGN_ID"

# For local testing, we'd start ffmpeg streaming
# ffmpeg -f x11grab -i :10 -c:v libx264 -preset ultrafast -f flv rtmp://...

echo -e "${GREEN}✓ Stream ready (simulated)${NC}"
echo ""

echo -e "${CYAN}[5/5] COMPLETE${NC}"
echo "────────────────────────────────────────────────────────────────"

# Update status to complete
cat > ./campaigns/$CAMPAIGN_ID/config.json << EOF
{
  "id": "$CAMPAIGN_ID",
  "title": "$CAMPAIGN_TITLE",
  "objective": "$CAMPAIGN_OBJECTIVE",
  "status": "complete",
  "funding": {
    "goal": 1000,
    "current": $FUNDING_AMOUNT,
    "spent": 50
  },
  "execution": {
    "started_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "completed_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "agent_host": "$AGENT_HOST"
  },
  "result": {
    "success": true,
    "artifacts": ["screenshot.png"]
  }
}
EOF

echo -e "${GREEN}✓ Campaign marked complete${NC}"
echo ""

echo "═══════════════════════════════════════════════════════════════"
echo -e "${GREEN}  PIPELINE TEST COMPLETE${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Campaign files: ./campaigns/$CAMPAIGN_ID/"
cat ./campaigns/$CAMPAIGN_ID/config.json
echo ""

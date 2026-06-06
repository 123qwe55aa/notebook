#!/bin/bash
set -e

# Cloudinary credentials (inline)
CLOUD_NAME="dot03lwtd"
API_KEY="362871543862112"
API_SECRET="jurXBvsHcaOaGge74z5Y_OQhiTI"

# ── 1. Upload ──
echo "=== Uploading sample image ==="
curl -sL "https://res.cloudinary.com/demo/image/upload/sample.jpg" -o /tmp/cloudinary-sample.jpg
UPLOAD_OUTPUT=$(cloudinary upload /tmp/cloudinary-sample.jpg \
  --cloud_name "$CLOUD_NAME" --api_key "$API_KEY" --api_secret "$API_SECRET" \
  --folder "onboarding" 2>&1)
echo "$UPLOAD_OUTPUT"

# Extract public ID: "upload/v12345/onboarding/xxx" -> "onboarding/xxx"
PUBLIC_ID=$(echo "$UPLOAD_OUTPUT" | python3 -c "import sys,re; m=re.search(r'upload/v\d+/([^.\s]+)', sys.stdin.read()); print(m.group(1))" 2>/dev/null || echo "")
echo "Public ID: $PUBLIC_ID"

# ── 2. Image details via Admin API ──
echo ""
echo "=== Image Metadata ==="
DETAILS=$(curl -s "https://api.cloudinary.com/v1_1/$CLOUD_NAME/resources/image/upload?public_ids\[\]=$PUBLIC_ID" \
  -u "$API_KEY:$API_SECRET")
echo "$DETAILS" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if 'resources' in data and data['resources']:
    r = data['resources'][0]
    print(f'  Width:      {r.get(\"width\")}px')
    print(f'  Height:     {r.get(\"height\")}px')
    print(f'  Format:     {r.get(\"format\")}')
    sz = r.get('bytes', 0)
    print(f'  Size:       {sz} bytes ({sz/1024:.1f} KB)')
else:
    print('  No details found')
" 2>&1 || echo "  (could not parse metadata)"

# ── 3. Transformed URL ──
echo ""
echo "=== Transformed URL ==="
# f_auto = automatically picks best format (WebP, AVIF, etc.) for the browser
# q_auto = automatically optimizes quality vs file size
TRANSFORMED_URL="https://res.cloudinary.com/$CLOUD_NAME/image/upload/f_auto,q_auto/$PUBLIC_ID"
echo "$TRANSFORMED_URL"
echo ""
echo "Done! Click link below to see optimized version of the image."
echo "Check the size and the format."
echo "$TRANSFORMED_URL"

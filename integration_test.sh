#!/bin/bash

# Integration test for Webclinic frontend + backend

set -e

BACKEND_URL="http://localhost:8080"
FRONTEND_URL="http://localhost:3001"

echo "=== Webclinic Integration Tests ==="
echo ""

# Test 1: Backend health
echo "Test 1: Backend health endpoint"
HEALTH=$(curl -s "$BACKEND_URL/api/health")
if echo "$HEALTH" | grep -q '"status":"ok"'; then
    echo "✅ PASS: Backend health endpoint responds with ok"
else
    echo "❌ FAIL: Backend health endpoint failed"
    echo "Response: $HEALTH"
    exit 1
fi
echo ""

# Test 2: Backend hello
echo "Test 2: Backend hello endpoint"
HELLO=$(curl -s "$BACKEND_URL/api/hello")
if echo "$HELLO" | grep -q '"message"'; then
    echo "✅ PASS: Backend hello endpoint responds with message"
    echo "Response: $HELLO"
else
    echo "❌ FAIL: Backend hello endpoint failed"
    exit 1
fi
echo ""

# Test 3: Frontend loads
echo "Test 3: Frontend page loads"
FRONTEND=$(curl -s "$FRONTEND_URL/")
if echo "$FRONTEND" | grep -q '<h1>Webclinic</h1>'; then
    echo "✅ PASS: Frontend page renders with title"
else
    echo "❌ FAIL: Frontend page missing title"
    exit 1
fi
echo ""

# Test 4: Frontend has backend message placeholder
echo "Test 4: Frontend has backend message integration"
if echo "$FRONTEND" | grep -q 'Backend says'; then
    echo "✅ PASS: Frontend has backend integration code"
else
    echo "❌ FAIL: Frontend missing backend integration"
    exit 1
fi
echo ""

# Test 5: API response codes
echo "Test 5: Verify API response codes"
HEALTH_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/health")
HELLO_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/hello")

if [ "$HEALTH_CODE" = "200" ] && [ "$HELLO_CODE" = "200" ]; then
    echo "✅ PASS: Both API endpoints return 200 OK"
    echo "   /api/health: $HEALTH_CODE"
    echo "   /api/hello: $HELLO_CODE"
else
    echo "❌ FAIL: API endpoints returned unexpected status"
    echo "   /api/health: $HEALTH_CODE"
    echo "   /api/hello: $HELLO_CODE"
    exit 1
fi
echo ""

# Test 6: Response headers
echo "Test 6: Verify JSON content type"
CONTENT_TYPE=$(curl -s -I "$BACKEND_URL/api/health" | grep -i "content-type" | cut -d' ' -f2 | tr -d '\r')
if echo "$CONTENT_TYPE" | grep -q "application/json"; then
    echo "✅ PASS: API returns JSON content type"
    echo "   Content-Type: $CONTENT_TYPE"
else
    echo "❌ FAIL: API not returning JSON"
    exit 1
fi
echo ""

echo "=== All Integration Tests Passed ✅ ==="

#!/bin/bash

# Quick start script for Morsdag 2026 game

echo "🎮 Starting Morsdag 2026 Game..."
echo ""
echo "Opening game at http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

# Start Python HTTP server
python3 -m http.server 8000

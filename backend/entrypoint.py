#!/usr/bin/env python
"""Entry point for Render deployment"""
import os
import subprocess
import sys

# Get port from environment variable (Render sets this automatically)
port = os.environ.get('PORT', '8000')
host = '0.0.0.0'

print(f"Starting Uvicorn on {host}:{port}")

# Run uvicorn with the port
subprocess.run(
    ['uvicorn', 'app:app', '--host', host, '--port', port],
    check=True
)

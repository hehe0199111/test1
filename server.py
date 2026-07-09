import http.server
import socketserver
import mimetypes

PORT = 8000

mimetypes.add_type('application/wasm', '.wasm')
mimetypes.add_type('application/octet-stream', '.data')
mimetypes.add_type('application/octet-stream', '.tflite')
mimetypes.add_type('application/octet-stream', '.binarypb')

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running at http://localhost:{PORT}/hand-art-2.html")
    httpd.serve_forever()
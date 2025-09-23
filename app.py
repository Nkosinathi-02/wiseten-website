from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser
import os
import urllib.parse

class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the path
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        
        # Handle component requests specifically
        if path.startswith('/components/'):
            # Serve component files directly
            return SimpleHTTPRequestHandler.do_GET(self)
        
        # If the path is a directory or doesn't have an extension, serve HTML
        if path == '/' or not os.path.splitext(path)[1]:
            if path == '/':
                self.path = '/index.html'
            else:
                # Check if the file exists with .html extension
                html_path = path + '.html'
                if os.path.exists(html_path[1:]):  # Remove leading slash
                    self.path = html_path
                else:
                    # If HTML file doesn't exist, try serving as is
                    pass
        
        return SimpleHTTPRequestHandler.do_GET(self)
    
    def end_headers(self):
        # Add CORS headers for component loading
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        SimpleHTTPRequestHandler.end_headers(self)

def run_server(port=8000):
    # Change to the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    server_address = ('', port)
    httpd = HTTPServer(server_address, CustomHTTPRequestHandler)
    
    print(f"Server running on http://localhost:{port}")
    print("Serving files from:", script_dir)
    print("\nAvailable pages:")
    print("- Home: http://localhost:8000")
    print("- Contact: http://localhost:8000/contact.html")
    print("\nPress Ctrl+C to stop the server")
    
    # Open the home page in browser
    webbrowser.open(f"http://localhost:{port}")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.shutdown()

if __name__ == '__main__':
    run_server()
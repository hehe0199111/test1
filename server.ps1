$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8000/")
$listener.Start()
Write-Host "Server running at http://localhost:8000/hand-art-2.html"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $localPath = $request.Url.LocalPath
    if ($localPath -eq "/") {
        $localPath = "/hand-art-2.html"
    }
    
    $filePath = Join-Path $PWD.Path $localPath.TrimStart("/")
    
    if (Test-Path $filePath -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        switch ($ext) {
            ".html" { $response.ContentType = "text/html; charset=utf-8" }
            ".js" { $response.ContentType = "application/javascript" }
            ".wasm" { $response.ContentType = "application/wasm" }
            ".data" { $response.ContentType = "application/octet-stream" }
            ".tflite" { $response.ContentType = "application/octet-stream" }
            ".binarypb" { $response.ContentType = "application/octet-stream" }
            default { $response.ContentType = "application/octet-stream" }
        }
        
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
    }
    
    $response.Close()
}
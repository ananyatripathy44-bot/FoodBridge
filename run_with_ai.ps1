$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
if (-not (Test-Path '.venv\Scripts\python.exe')) {
    if (Get-Command py -ErrorAction SilentlyContinue) { py -3 -m venv .venv }
    else { python -m venv .venv }
}
$python = Join-Path $PSScriptRoot '.venv\Scripts\python.exe'
& $python -m pip install --upgrade pip
& $python -m pip install -r requirements.txt
$secure = Read-Host 'Paste OpenAI API key (input hidden)' -AsSecureString
$ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
try { $env:OPENAI_API_KEY = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) }
finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
$env:FOODBRIDGE_AI_MODEL = if ($env:FOODBRIDGE_AI_MODEL) { $env:FOODBRIDGE_AI_MODEL } else { 'gpt-4.1-mini' }
try { & $python app.py }
finally { Remove-Item Env:OPENAI_API_KEY -ErrorAction SilentlyContinue }

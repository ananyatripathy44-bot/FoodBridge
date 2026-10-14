@echo off
setlocal
cd /d "%~dp0"
echo ================================================
echo FOODBRIDGE - setup and launch
echo ================================================
where py >nul 2>nul
if %errorlevel%==0 (set "PYTHON=py -3") else (set "PYTHON=python")
if not exist ".venv\Scripts\python.exe" (
  echo Creating virtual environment...
  %PYTHON% -m venv .venv
  if errorlevel 1 goto fail
)
echo Installing/updating dependencies...
.venv\Scripts\python.exe -m pip install --upgrade pip
.venv\Scripts\python.exe -m pip install -r requirements.txt
if errorlevel 1 goto fail
if "%OPENAI_API_KEY%"=="" (
  echo.
  echo No OPENAI_API_KEY found. Site will run in local/demo AI mode.
  echo For live Anyaa chat, set OPENAI_API_KEY and run the optional PowerShell launcher.
) else (
  echo API key detected in this terminal environment.
)
echo.
echo Opening FOODBRIDGE at http://127.0.0.1:5000
.venv\Scripts\python.exe app.py
goto end
:fail
echo.
echo Setup failed. Check that Python is installed and internet access is available for pip.
pause
:end
endlocal

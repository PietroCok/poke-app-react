@echo off

if "%1"=="" (
  echo Missing required first parameter: folder
  exit /b
)

if "%2"=="" (
  echo Missing required second parameter: branchName
  exit /b
)

if "%3"=="" (
  echo Missing required third parameter: buildCommand
  exit /b
)

set folder=%1
set branchName=%2
set buildCommand=%3

echo Clearing output dir: %folder%
if exist "%folder%" rmdir /s /q "%folder%"

echo -------- Building application --------
call npm run %buildCommand%

echo ------------- Publishing -------------
cd "%folder%"
git init
git add .
git commit -m "deploy"
git branch -M %branchName%
git remote add origin https://github.com/PietroCok/poke-app-react.git
git push -f origin %branchName%

echo ---------------- Done ----------------
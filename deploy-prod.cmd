@echo off

echo -------- Clearing output dir --------
if exist dist rmdir /s /q dist

echo -------- Building application --------
call npm run build

echo -------- Publishing --------
cd dist
git init
git add .
git commit -m "deploy"
git branch -M gh-pages
git remote add origin https://github.com/PietroCok/poke-app-react.git
git push -f origin gh-pages

echo -------- Done --------


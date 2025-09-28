@echo off

echo -------- Clearing output dir --------
if exist dist-test rmdir /s /q dist-test

echo -------- Building application --------
call npm run build-test

echo -------- Publishing --------
cd dist-test
git init
git add .
git commit -m "deploy-test"
git branch -M test-env
git remote add origin https://github.com/PietroCok/poke-app-react.git
git push -f origin test-env

echo -------- Done --------


#!/bin/sh
export LANG=zh_CN.UTF-8
export PATH=$NODEJS_BIN_LATEST:$YARN_BIN_LATEST:$PATH

echo "node: $(node -v)"
echo "yarn: v$(yarn -v)"

echo 'start installing...'
yarn install
echo '√ end installing...'

echo 'start building...'
yarn run build
echo '√ end building!'

if [ "$?" -ne "0" ];then
 echo "build failed!"
 exit 1
fi

rm -rf output
mkdir output

cd ./dist
tar -czf app.tar.gz *
mv app.tar.gz ../output

echo 'build success'
exit 0

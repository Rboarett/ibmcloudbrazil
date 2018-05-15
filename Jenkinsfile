pipeline {
  agent any
  stages {
    stage('run first') {
      steps {
        sh '''pwd
ls
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt-get install -y nodejs
npm install
node --version
npm install -g yarn
npm install --global docusaurus-init
cd website
yarn upgrade docusaurus --latest
yarn run build

'''
      }
    }
  }
}
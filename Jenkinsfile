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
yarn upgrade docusaurus --latest
cd website
yarn run build

'''
      }
    }
  }
}
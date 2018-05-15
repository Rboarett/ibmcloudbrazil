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
yarn install
yarn global add docusaurus-init
cd website
yarn run build

'''
      }
    }
  }
}
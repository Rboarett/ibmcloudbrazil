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
yarn global add docusaurus-init
ls
cd website
yarn run build

'''
      }
    }
  }
}
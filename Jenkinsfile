pipeline {
  agent any
  stages {
    stage('prepare') {
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

'''
      }
    }
    stage('build') {
      steps {
        sh '''cd website 
yarn run build'''
      }
    }
    stage('build docker') {
      agent {
        docker {
          image 'nginx'
          args 'COPY ibmcloudbrazil.github.io /usr/share/nginx/html'
        }

      }
      steps {
        sh '''cd website
cd build'''
      }
    }
  }
}
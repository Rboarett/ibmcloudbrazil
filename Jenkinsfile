pipeline {
  agent any
  stages {
    stage('run first') {
      steps {
        sh '''echo $PATH
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
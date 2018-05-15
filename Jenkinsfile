pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''npm install -g yarn
yarn install
yarn global add docusaurus-init
cd website
yarn run build

'''
      }
    }
  }
}
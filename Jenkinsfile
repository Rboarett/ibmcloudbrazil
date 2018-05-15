pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''npm install -g yarn
yarn install
yarn run build
yarn global add docusaurus-init
'''
      }
    }
  }
}
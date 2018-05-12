pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''sh "npm install -g yarn"
sh "yarn install"
sh "yarn run build"'''
      }
    }
  }
}
pipeline {
    agent any

    environment {     
    DOCKERHUB_CREDENTIALS= credentials('docker_hub_elad')     
    } 


    stages {
        stage('client build') {
            steps {
                script {
                    dir('client') {
                        sh 'echo "Building..."'
                        sh 'docker build -t eladha123/oms-client .'
                    }
                }
            }
        }

        stage('server build') {
            steps {
                script {
                    dir('server') {
                        sh 'echo "Building..."'
                        sh 'docker build -t eladha123/oms-server .'
                    }
                }
            }
        }

         stage('dockerhub login') {
            steps {
                withCredentials([
                    usernamePassword(credentials: 'docker_hub_elad', usernameVariable: USR, passwordVariable: PWD)
                ]){
                    sh 'docker login -u ${USR} -p ${PWD}'
                }      
            }
        }

          stage('dockerhub push') {
            steps {
                script {
                    sh 'echo "Pushing..."'
                    sh 'docker push eladha123/oms-server'
                    sh 'docker push eladha123/oms-client'
                }
            }
        }
    }
}

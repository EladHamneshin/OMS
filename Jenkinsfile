pipeline {
    agent any

     environment {
        DOCKER_CREDENTIALS = credentials('docker-hub-elad')
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
		script{
                    sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'                		
	            sh 'echo "Login Completed"'   
                }      
            }
        }

        stage('dockerhub push') {
            steps {
                script {
                    sh 'echo "Pushing..."'
                    sh 'docker push eladha123/oms-server:latest'
                    sh 'docker push eladha123/oms-client:latest'
                }
            }
        }
    }
}

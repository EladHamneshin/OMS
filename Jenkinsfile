pipeline {
    agent any

    triggers {
        githubPush()
    }
    
    stages {
        stage('Build and Test') {
            steps {
                script {
                    dir('server') {
                         // Create the network if it doesn't exist
                        sh 'docker network ls | grep -q app-network || docker network create app-network'

                        // Build the Docker image for Express.js server
                        sh 'docker build -t oms-end-test .'

                        // Start MongoDB container
                        sh 'docker run -d --network app-network --name mongo-db mongo'

                        // Build and run the Express.js server container
                        sh "docker run --rm --name test --network app-network -e MONGO_URI=mongodb://mongo-db:27017/test oms-end-test npm i && npm test"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Stop and remove the MongoDB container
                sh 'docker stop mongo-db'
                sh 'docker rm mongo-db'
            }
        }
    }
}

pipeline {
    agent any
    environment {
        //be sure to replace "willbla" with your own Docker Hub username
        DOCKER_IMAGE_NAME = "zzahid99/contact-client-kubernetes-app"
    }
    stages {
        //stage('Build') {
            //steps {
             //   echo 'Running build automation'
           //     sh './gradlew build --no-daemon'
         //       archiveArtifacts artifacts: 'dist/trainSchedule.zip'
         //   }
       // }
       stage('checkout') {
            steps {
                dir('client') {
                    sh 'ls'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                dir('client') {
                    script {
                        app = docker.build(DOCKER_IMAGE_NAME)
                        app.inside {
                            sh 'echo Hello, World!'
                        }
                        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
        // stage('Push Docker Image') {
        //     steps {
        //         script {
        //             docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
        //                 app.push("${env.BUILD_NUMBER}")
        //                 app.push("latest")
        //             }
        //         }
        //     }
        // }
    }
}
pipeline {
    agent any
    environment {
        //be sure to replace "willbla" with your own Docker Hub username
        DOCKER_IMAGE_NAME = "zzahid99/contact-server-kubernetes-app"
    }
    stages {
        //stage('Build') {
            //steps {
             //   echo 'Running build automation'
           //     sh './gradlew build --no-daemon'
         //       archiveArtifacts artifacts: 'dist/trainSchedule.zip'
         //   }
       // }
        stage('Build Docker Image') {
            steps {
                script {
                    app = docker.build(DOCKER_IMAGE_NAME)
                    app.inside {
                        sh 'echo Hello, World!'
                    }
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
        stage('DeployToProduction') {
            steps {
                withCredentials([file(credentialsId: 'kube-config-file', variable: 'FILE')]) {
                  sh 'kubectl delete deployment contact-server-app-deploy && kubectl create -f server-app-deploy.yaml --validate=false --kubeconfig $FILE'
                }
            }
        }
    }
}
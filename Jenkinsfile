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
                    sh 'npm install && npm run build'
                }
            }
        }
        stage('Build and Push Docker Image') {
            steps {
                dir('client') {
                    script {
                        app = docker.build(DOCKER_IMAGE_NAME)
                        // app.inside {
                        //     sh 'echo Hello, World!'
                        // }
                        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                            app.push("${env.BUILD_NUMBER}")
                            app.push("latest")
                        }
                    }
                }
            }
        }
        // stage('Push Docker Image') {
        //     steps {
        //         dir('client') {
        //             script {
        //                 docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
        //                     app.push("${env.BUILD_NUMBER}")
        //                     app.push("latest")
        //                 }
        //             }
        //         }
        //     }
        // }
        stage('DeployToProduction') {
            steps {
                dir('client') {
                    withCredentials([file(credentialsId: 'kube-config-file', variable: 'FILE')]) {
                        sh 'kubectl delete deployment contact-client-app-deploy --kubeconfig $FILE'
                        sh 'sed -e "s|%%HOST%%|$(minikube service contact-backend-service --url)|g" client-app-deploy.yaml | kubectl apply -f - --validate=false --kubeconfig $FILE'
                        sh 'kubectl get pod --kubeconfig $FILE'
                    }
                }
            }
        }
    }
}
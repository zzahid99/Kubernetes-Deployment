pipeline {
    agent any
    environment {
        //be sure to replace "willbla" with your own Docker Hub username
        DOCKER_IMAGE_NAME_BACK_END = "zzahid99/contact-server-kubernetes-app"
        DOCKER_IMAGE_NAME_FRONT_END = "zzahid99/contact-client-kubernetes-app"
    }
    stages {
        // Back-End
       stage('Build and Push Docker Image Back-End') {
            steps {
                script {
                    app = docker.build(DOCKER_IMAGE_NAME_BACK_END)
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
        stage('Deploy') {
            steps {
                withCredentials([file(credentialsId: 'kube-config-file', variable: 'FILE')]) {
                    sh 'kubectl delete deployment contact-server-app-deploy --kubeconfig $FILE'
                    sh 'kubectl create -f server-app-deploy.yaml --validate=false --kubeconfig $FILE'
                    sh 'kubectl get pod --kubeconfig $FILE'
                }
            }
        }
       // Front-End 
       stage('checkout') {
            steps {
                dir('client') {
                    sh 'npm install && npm run build'
                }
            }
        }
        stage('Build and Push Docker Image Front-End') {
            steps {
                dir('client') {
                    script {
                        app = docker.build(DOCKER_IMAGE_NAME_FRONT_END)
                        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                            app.push("${env.BUILD_NUMBER}")
                            app.push("latest")
                        }
                    }
                }
            }
        }
        stage('DeployToProduction') {
            steps {
                dir('client') {
                    withCredentials([file(credentialsId: 'kube-config-file', variable: 'FILE')]) {
                        sh 'kubectl delete deployment contact-client-app-deploy --kubeconfig $FILE'
                        sh 'sed -e "s|%%HOST%%|${host}|g" client-app-deploy.yaml | kubectl apply -f - --kubeconfig $FILE'
                        sh 'kubectl get pod --kubeconfig $FILE'
                    }
                }
            }
        }
    }
}
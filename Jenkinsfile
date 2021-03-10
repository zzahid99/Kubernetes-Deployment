properties([
  parameters([
    string(name: 'host', defaultValue: '')
  ])
])

pipeline {
    agent any
    environment {
        //be sure to replace "willbla" with your own Docker Hub username
        registryCredentials = "nexus"
        registry = "192.168.49.2:30728/"
        DOCKER_IMAGE_NAME_BACK_END = "zzahid99/contact-server-kubernetes-app"
        DOCKER_IMAGE_NAME_FRONT_END = "zzahid99/contact-client-kubernetes-app"
        secretFile = "${env.BRANCH_NAME == 'dev' ? 'kube-config-file-dev' : env.BRANCH_NAME == 'qa' ? 'kube-config-file-qa' : env.BRANCH_NAME == 'uat' ? 'kube-config-file-uat' : ''}"
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
                    docker.withRegistry('http://'+registry, registryCredentials) {
                        ///app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([file(credentialsId: secretFile, variable: 'FILE')]) {
                    // sh 'kubectl config get-contexts --kubeconfig $FILE'
                    // //sh 'kubectl config use-context minikube --kubeconfig $FILE'
                    // sh 'kubectl config current-context --kubeconfig $FILE'
                    //sh 'kubectl delete deployment contact-server-app-deploy --kubeconfig $FILE'
                    sh 'kubectl create -f server-app-deploy.yaml --validate=false --kubeconfig $FILE'
                    sh 'kubectl get pod --kubeconfig $FILE'
                }
            }
        }
       //Front-End 
    //    stage('checkout') {
    //         steps {
    //             dir('client') {
    //                 sh 'npm install && npm run build'
    //             }
    //         }
    //     }
    //     stage('Build and Push Docker Image Front-End') {
    //         steps {
    //             dir('client') {
    //                 script {
    //                     app = docker.build(DOCKER_IMAGE_NAME_FRONT_END)
    //                     docker.withRegistry('http://'+registry, registryCredentials) {
    //                         //app.push("${env.BUILD_NUMBER}")
    //                         app.push("latest")
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     stage('DeployToProduction') {
    //         steps {
    //             dir('client') {
    //                 withCredentials([file(credentialsId: secretFile, variable: 'FILE')]) {
    //                     sh 'kubectl delete deployment contact-client-app-deploy --kubeconfig $FILE'
    //                     sh 'sed -e "s|%%HOST%%|${host}|g" client-app-deploy.yaml | kubectl apply -f - --kubeconfig $FILE'
    //                     sh 'kubectl get pod --kubeconfig $FILE'
    //                 }
    //             }
    //         }
    //     }
    }
}
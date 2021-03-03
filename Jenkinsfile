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
                kubernetesDeploy configs: 'mongodb-service.yaml persistent-vol-claim-server-app.yaml server-app-deploy.yaml mongodb-pod.yaml persistent-vol-server-app.yaml server-app-configs.yaml server-app-service.yaml', kubeConfig: [path: ''], kubeconfigId: 'kubernetes', secretName: '', ssh: [sshCredentialsId: '*', sshServer: ''], textCredentials: [certificateAuthorityData: '', clientCertificateData: '', clientKeyData: '', serverUrl: 'https://']
            }
        }
    }
}
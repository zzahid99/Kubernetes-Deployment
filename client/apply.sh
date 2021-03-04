#!/bin/bash
sed -e "s|%%HOST%%|$(minikube service contact-backend-service --url)|g" client-app-deploy.yaml | kubectl apply -f -

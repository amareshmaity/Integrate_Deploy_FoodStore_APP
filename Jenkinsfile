pipeline{
    agent any

    environment{
        SSH_KEY_PATH='D:\\food-store-ci-cd-ec2-login.pem'
        SSH_USER='ec2-user'
        SSH_HOST='52.90.209.81'
    }

    stages{
        stage('checkout'){
            steps{
                git url: 'https://github.com/amareshmaity/Integrate_Deploy_FoodStore_APP.git', branch:'main'
            }
        }

        stage('Build'){
            steps{
                bat 'docker-compose build --no-cache'
            }
        }

        stage('Tag Image'){
            steps{
                bat 'docker tag foodstore-app amareshmaity/foodstore-app:latest'
            }
        }

        stage('Push Image'){
            steps{
                bat 'docker login -u amareshmaity -p aS!PnJ7MDfCgxe9'
                bat 'docker push amareshmaity/foodstore-app:latest'
            }
        }

        stage('Deploy'){
            steps{
                bat """
                ssh -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST}
                """
            }
        }
    }
}
pipeline{
    agent any

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
    }
}
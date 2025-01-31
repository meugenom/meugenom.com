pipeline {
    agent any

    stages {

        stage('Update Repository') {
            steps {
                script {
                    sh 'cd /var/lib/jenkins/workspace/meugenom.com && git pull origin main'
                }
            }
        }

        stage('Copy .env to client directory') {
            steps {
                 sh 'cp /var/lib/jenkins/workspace/meugenom.com.env/.env /var/lib/jenkins/workspace/meugenom.com/client/.env'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'cd client && npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'cd client && npm run build'
            }
        }

        stage('Start Frontend') {
            steps {
                sh 'pm2 delete meugenom-server.js || true'
                sh 'pm2 restart frontend || pm2 start client/meugenom-server.js'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'cd server && mvn clean package'
            }
        }

        stage('Start Backend') {
            steps {
                script {
                    def processId = sh(script: "pgrep -f 'target/spring-data-graphql*'", returnStdout: true).trim()
                    if (processId) {
                        sh "kill -9 ${processId}"  // Kill old process
                    }
                    sh 'cd server && ./start-prod-server-background.sh'
                }
            }
        }   
    }
}

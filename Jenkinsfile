pipeline {
    agent any

    stages {

        stage('Copy .env to client directory') {
            steps {
                fileOperations([
                    fileCopyOperation(
                        includes: 'meugenom.com.env/client/.env',
                        targetLocation: 'client/.env'
                    )
                ])
            }
        }

        stage('Change Directory') {
            steps {
                sh 'npm install --prefix client'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Delete Frontend Server from runtime') {
            steps {
                sh 'pm2 delete meugenom-server.js || true'                
            }
        }

        stage('Statr Frontend Server in the PM2') {
            steps {
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

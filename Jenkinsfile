node {
    def app
    env.ORG_NAME = 'mrityunjay'
    env.PROJECT_NAME = 'aahana'
    env.DOCKER_REGISTRY = 'http://localhost:5050'
    env.TAG = 'latest'
    
    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }
    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("${env.ORG_NAME}/${env.PROJECT_NAME}")
    }
        stage('Check') {
        app.inside {
           /* sh 'npm audit fix --only=prod' */
           sh 'npm install -g eslint'
           sh 'npm install -g eslint-config-google'
           sh 'npm run check'
        }
    }
    stage('Audit') {
        app.inside {
           /* sh 'npm audit fix --only=prod' */
           sh 'echo "Audit"'
           sh 'npm audit'
        }
    }
    stage('Test') {
        app.inside {
            sh 'npm i g mocha'
            sh 'npm test'
        }
    }
    stage('Push image') {
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        docker.withRegistry("${env.DOCKER_REGISTRY}") {
            app.push("${env.BUILD_NUMBER}")
            // app.push("${env.TAG}")
        }
    }
}

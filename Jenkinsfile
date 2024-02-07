#!groovy

def tag_image_as(imageUrl, tag) {
  script {
    docker.image("${imageUrl}:${env.BUILD_NUMBER}").push(tag)
    sh "docker rmi ${imageUrl}:${tag} || true"
  }
}

def deploy(app, environment) {
  build job: 'Subtask_Openstack_Playbook',
    parameters: [
        [$class: 'StringParameterValue', name: 'INVENTORY', value: environment],
        [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy.yml'],
        [$class: 'StringParameterValue', name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_${app}"],
    ]
}

pipeline {

  agent any

  environment {
    GROUP = "vnor"
    FRONTEND_APP = "bereikbaarheid"
    FRONTEND_DOCKERFILE = "Dockerfile"
    FRONTEND_DOCKER_BUILD_CONTEXT = "."
    FRONTEND_DOCKER_IMAGE = "${GROUP}/${FRONTEND_APP}"
    FRONTEND_DOCKER_IMAGE_URL = "${DOCKER_REGISTRY_NO_PROTOCOL}/${FRONTEND_DOCKER_IMAGE}"
  }

  stages {

    stage("Checkout") {
      steps {
        checkout scm
        script { env.COMMIT_HASH = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim() }
      }
    }

    stage("Build, push and deploy acceptance image") {
      when { branch 'main' }
      steps {
        script {
          def frontend_image = docker.build("${FRONTEND_DOCKER_IMAGE_URL}:${env.BUILD_NUMBER}","-f ${FRONTEND_DOCKERFILE} ${FRONTEND_DOCKER_BUILD_CONTEXT} --build-arg BUILD_ENV=acc")
          frontend_image.push()
        }
        tag_image_as("${FRONTEND_DOCKER_IMAGE_URL}", "acceptance")
        deploy("${FRONTEND_APP}", "acceptance")
      }
    }

    stage("Deploy to production") {
      when { branch 'main' }
      options {
        timeout(time: 6, unit: 'HOURS')
      }
      input {
        message "Deploy to Production?"
        ok "Yes, deploy it!"
        }
      steps {
        script {
          def frontend_image = docker.build("${FRONTEND_DOCKER_IMAGE_URL}:${env.BUILD_NUMBER}","-f ${FRONTEND_DOCKERFILE} ${FRONTEND_DOCKER_BUILD_CONTEXT} --build-arg BUILD_ENV=prod")
          frontend_image.push()
        }
        tag_image_as("${FRONTEND_DOCKER_IMAGE_URL}", "latest")
        tag_image_as("${FRONTEND_DOCKER_IMAGE_URL}", "production")
        deploy("${FRONTEND_APP}", "production")
      }
    }

  }

  post {
    always {
      script { sh "docker rmi ${FRONTEND_DOCKER_IMAGE_URL}:${env.BUILD_NUMBER} || true" }
    }
  }

}

# Docker commands
'''bash
// pull docker image from Docker Hub
$ docker pull <image-name>
// create containers from docker image
$ docker run <image-name> (if necessary, commands of images)
// check running containers
$ docker ps, options: -a(to see all containers including stopping ones)
// start existing containers
$ docker start <container's name or id>, you can start multipule containers
// stop running containers
$ docker stop <container's name or id>, you can stop multipule containers
// remove containers which are not running
$ docker rm <container's name or id>
// see logs, options: -f 
$ docker logs <container's name or id>
// pull an image and create a container based on docker-compose.yml
$ docker compose up -d
'''


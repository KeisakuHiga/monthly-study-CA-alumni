# Docker commands
- pull docker image from Docker Hub
```bash
$ docker pull <image-name>
```
- create containers from docker image
```bash
$ docker run <image-name> (if necessary, commands of images)
```
- check running containers
```bash
$ docker ps, options: -a(to see all containers including stopping ones)
```
- start existing containers
```bash
$ docker start <container's name or id>, you can start multipule containers
```
- stop running containers
```bash
$ docker stop <container's name or id>, you can stop multipule containers
```
- remove containers which are not running
```bash
$ docker rm <container's name or id>
```
- see logs, options: -f 
```bash
$ docker logs <container's name or id>
```
- pull an image and create a container based on docker-compose.yml
```bash
$ docker compose up -d
```


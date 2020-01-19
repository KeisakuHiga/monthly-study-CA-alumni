# Developing Laravel environment with Docker
  https://tech.windii.jp/backend/laravel/laravel-with-docker-compose

## trouble shootings

### Error starting userland proxy: listen tcp0.0.0.0:3306: bind: address already in use
  https://stackoverflow.com/questions/37896369/error-starting-userland-proxy-listen-tcp0-0-0-03306-bind-address-already-in


- how to check running ports
  https://qiita.com/sonoshou/items/cc2b740147ba1b8da1f3


```bash
$ sudo lsof -i:<port-number>
```

- how to kill a running port
```bash
$ sudo kill <PID-number>
```

## YAML file
  https://magazine.rubyist.net/articles/0009/0009-YAML.html

## Docker commands
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


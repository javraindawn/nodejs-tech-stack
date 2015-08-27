# NodeJS Technology Stack
A blank project using a custom NodeJS tech stack with Vagrant, Docker and HapiJS

## What you need

#### Get Vagrant + Virtualbox

Head on over to [http://vagrantup.com](http://vagrantup.com) and download the [latest](https://www.vagrantup.com/downloads.html) version of Vagrant.

You will also need to download the [latest](https://www.virtualbox.org/wiki/Downloads) version of Virtual Box.

#### Get Rsync

We'll be using the built in rsync capabilities that ship in Vagrant. In order to use these features, you will need to have `rsync` installed on your local machine. OS X ships with a version pre-installed. Linux users may need to install it with a package manager.

#### Docker

You should install the Docker client on your local machine so you can use it to interact with the Docker host that is built.

Use [Homebrew](http://brew.sh/) (on Mac OS X) to install the Docker CLI by running the:

```bash
brew install docker
```

#### Setting up your Docker Host

Included in the project is a Docker Host in the following folder: ```dockerhost```

You will find a ```Vagrantfile``` that will automatically be run once you boot up the project.

## Pre-Deployment Steps

Docker relies heavily on Environment Variables to passing config into the container. Before deploying your containers to the Docker Host, you will need to create a symlink to the appropriate .envvar file for local development.

From the project root, run:

```
ln -s ./envs/.envvars.local .envvars
```

Don't forget to add the following to your ```hosts``` file:

```
192.168.100.250 project.local
```

## Fire it up

From the project root, run:

```bash
vagrant up --no-parallel
```

## Access the App

You should now be able to access the hello world module that the skeleton ships with by going to [http://project.local:8069/hello](http://project.local:8069/hello).

You can also check the ```hapi-swagger``` installation by going to [http://project.local:8069/documentation](http://project.local:8069/documentation).

## Viewing the App Logs

- Run ```docker ps``` and look for the **container ID** that is running the ```api``` image.

- Execute ```docker logs -f <CONTAINER_ID>```

## Running the Tests

Included in the skeleton is a simple test package. You can access it by first logging into the docker container as follows:

- Run ```docker ps``` and look for the **container ID** that is running the ```api``` image.

- To open a shell into the running container, type in ```docker exec -it <CONTAINER_ID>```

- Once inside, you must first execute ```source .envvars``` to load the project's Environment Variables and then run ```npm test``` to execute the test package.

## Syncing files to the Container

The Vagrant config will rsync the application to the Docker host, and mount the rsync'd folder to the container as a Volume.

To make sure that your file changes are sent to the Container, you should run the following and it will stay running, watching the project folder for changes and syncing them.

```bash
vagrant rsync-auto
```


###### - -

This project was heavily inspired from [ZehnerGroup](https://github.com/zehnergroup)'s Vagrant + Docker stacks used in the Locker Room Project.

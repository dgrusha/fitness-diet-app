# Fitness app application

This readme provides step by step instruction for set up of this project on yout local machine.

### Setting up ssh-key
In git bach do :
```
$ ssh-keygen -t ed25519 -C "your_email@example.com"
```
Choose no passphrase and save it to default folder

Check if your ssh-agent is on : 
```
$ eval "$(ssh-agent -s)"
> Agent pid 59566 (your individual number is here)
```

Go to where your .ssh key where generated and add them to ssh-agent: 
```
$ ssh-add ~/.ssh/id_ed25519
```

Then go to Settings of the repository and to Deploy Keys and add your .pub key.

### Cloning repostitory 
To clone repository after ssh-key set up you need to copy ssh link in code section and do:
```
git clone git@github.com:dgrusha/fitness-diet-app.git
```

Answer yes to all the questions. 

** Now you are basicaly set up ** 
# Fitness app application

This file provides step by step instruction to set up EaTrain using your local machine.

### Setting up ssh-key
Open git BASH and run command provided below
```
$ ssh-keygen -t ed25519 -C "your_email@example.com"
```
Choose no passphrase and ssh-key will be saved to default folder ("C:/Users/{username}")

Check if your ssh-agent is on by running the following command: 
```
$ eval "$(ssh-agent -s)"
> Agent pid 59566 (your individual number is here)
```

Go to the folder your .ssh key was saved to and add it to ssh-agent: 
```
$ ssh-add ~/.ssh/id_ed25519
```

Then go to Settings section on GitHub, navigate to SSH and GPG keys tab and add your .pub key.

### Cloning repostitory 
To clone repository after ssh-key set up you need to copy ssh link in code section and run it in git BASH
```
git clone git@github.com:dgrusha/fitness-diet-app.git
```

Answer yes to all the questions appearing while clonning proccess. 

>**Now you have completed basic set up** 

### Set up project secret keys 
1. Run PowerShell as administrator

2. Make sure you have Entity Framework Core tools installed globally on your system:
```
dotnet ef
```
You can install them using the following command:
```
dotnet tool install --global dotnet-ef
```

3. Navigate to "\fitness-diet-app\src\FitnessApp"

4. Run the following command
```
dotnet user-secrets init --project .\FitnessApp.Api\
```

5. Set a value to JWTToken for example:
```
dotnet user-secrets set --project .\FitnessApp.Api\ "JwtSettings:Secret" "your-super-puper-secret-key"
```

This value will be automatically added to field Secret in appsettings.Development file

You can check user secrets you already have using: 
```
dotnet user-secrets list --project .\FitnessApp.Api\
```

### Migrations 

Add migrations:
```
dotnet ef migrations add MIGRATION_NAME --project FitnessApp.Infrastructure --startup-project FitnessApp.Api
```

Run migrations:
```
dotnet ef database update --project FitnessApp.Infrastructure --startup-project FitnessApp.Api
```

Delete last migration: 
```
dotnet ef migrations remove --project FitnessApp.Infrastructure --startup-project FitnessApp.Api
```

### Flow for basic adding of a model

1. Add Model in Domain layer 
2. Add interface for repository in Application.Common.Interfaces.Persistance
3. Add class for repository in Infrastructure.Persistance
4. Add class for configuration of a model, add it to context and add this context to new repository
5. Add migrations and add migrations from \src\FitnessApp
6. Add repository in dependency injection class in Infrastructure
7. Add new folder to with Model name to application layer
8. Create commands and queries folders // add accordingly needed requests and their handlers
9. Configure controller
DONE!

### Redis 
To download server on windows: https://github.com/tporadowski/redis/releases
To download server on linux: https://redis.io/download/

REDIS ADRESS = 127.0.0.1:6379

## Setting up AWS CLI configuration
Go here and install the AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
Access key and token are kept privately so ask dgrusha for permission
Then check if it was installed properly -> aws --version
And to set it up use -> aws configure 
Our region is eu-north-1
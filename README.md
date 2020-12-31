# CSL

Sito del Comitato Studentesco del [Liceo Lussana](https://liceolussana.edu.it) di Bergamo.

<p align="center"><img src="./apps/client/src/assets/img/logo.png" width="350"></p>

🔎 **In quanto Comitato Studentesco, ci occupiamo di tutte le attività dedicate a noi studenti del Liceo.**

## Finalità della piattaforma

Fill with the purpose of this application

## Tecnologie utilizzate

Fill with a list of used tools

## Istruzioni per la distribuzione

Remove `server` and `maintenance` directories from the server.

Use this command from the `csl` directory to upload the server files to a remote location...

```shell
pscp -P 22 -i C:\src\keys\csl-prod\ssh-csl-prod.ppk -r dist\server\* root@207.154.230.74:/home/luckee/csl/server
```

...this command to upload the client files...
```shell
pscp -P 22 -i C:\src\keys\csl-prod\ssh-csl-prod.ppk -r dist\client\* root@207.154.230.74:/home/luckee/csl/client
```

...or this command to upload the maintenance files
```shell
pscp -P 22 -i C:\src\keys\csl-prod\ssh-csl-prod.ppk -r dist\maintenance\* root@207.154.230.74:/home/luckee/csl/maintenance
```

Then, inside the `csl` folder of the server, run
```
# Start the Mongo replica set
docker-compose db-rs1 db-rs2 db-rs3

# Access first Mongo instance
docker exec -it csl_db-rs1_1 bash

# Setup Mongo replica set
mongo setup/index.js
```

After that, build the main server and the maintenance server with
```
# Don't start the services
docker-compose up --build --no-start server

docker-compose up --build --no-start maintenance
```

And then start the appropriate service with
```
docker-compose start <service-name>
```
## Politica sui Cookie e informazioni sulla privacy

We store cookies exclusively for authentication purposes, no device or personal info is stored

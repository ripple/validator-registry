# validators.ripple.com

Node.js server application to track and reward validator performance,
and report on the state of the ripple peer network.

a [Sails](http://sailsjs.org) application

## Migrate

Add db configuration to config/config.json

````
sequelize db:migrate --url YOUR_POSTGRES_DB_URL
````

## Run

````
DATABASE_URL=YOUR_POSTGRES_DB_URL npm start
````

## HTML Pages

##### GET /

### Validators and Validations

##### GET /validators
##### GET /validators/:public_key
##### GET /validators/:public_key/validations
##### GET /ledgers/:ledger_hash/validations
##### GET /ledgers/:ledger_hash/validations/:validation_public_key
##### POST /validations

### Incentivization

##### GET /incentivization
##### GET /incentivization/payouts
##### GET /incentivization/payouts/:id
##### GET /validators/:public_key/payouts

### Peer Crawler

##### GET /peer-crawler
##### GET /peer-crawler/crawls
##### GET /peer-crawler/crawls/:id

# Local Hacking

To hack on validators.ripple.com, you'll need:

* Docker (``apt-get install docker``)
* Docker-compose (``pip install docker-compose``)

To build the environment:

```
$ docker-compose build
$ docker-compose run webapp npm install
```

To bring up the environment:

```
$ docker-compose up
```

You'll now have validators.ripple.com running on localhost:1337.

Any modifications to the code will require:

```
$ docker-compose stop
$ docker-compose up
```

If you need a shell:

```
$ docker-compose run webapp /bin/bash
```

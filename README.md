# validators-registry-api

Node.js server application to track and publish rippled validator performance and ownership.

a [Sails](http://sailsjs.org) application

## API Documentation

HTTP/JSON endpoint documentation is maintained in source control using [ApiDoc](http://apidocjs.com/)
ApiDoc annotations exist above individual controller actions in `api/controllers/`

````
npm run apidoc:build
````

Will update documentation in the /assets directory

## Migrate

Add db configuration to config/config.json

````
sequelize db:migrate --url YOUR_POSTGRES_DB_URL
````

## Run

````
DATABASE_URL=YOUR_POSTGRES_DB_URL RIPPLED_CRAWLER_API_URL=YOUR_RIPPLED_CRAWLER_API_URL npm start
````

## Basic Authentication

To require basic http authentication set the following environment variables:

- BASIC_AUTH_USER (default undefined)
- BASIC_AUTH_PASS (default undefined)

If both variables are set validator-registry-api will require basic auth in order to POST to /validations

## API Documentation

(https://api-staging.validators.ripple.com)[https://api-staging.validators.ripple.com]

# Local Development

To hack on validators-registry-api, you'll need:

* Docker (``apt-get install docker``)
* Docker-compose (``pip install docker-compose``)

To build the environment:

```
$ docker-compose build
```

To bring up the environment:

```
$ docker-compose up
```

You'll now have validators-registry-api running on localhost:1337.

Any modifications to the code will require a restart of the webapp container.
Usually you can ^C and re-run ``docker-compose up webapp``

If you need a shell:

```
$ docker-compose run webapp /bin/bash
```

To run tests:

```
$ docker-compose run webapp npm test
```

NOTE: Tests truncate local db tables

# Deployment to api.validators.ripple.com

Check the README in the ansible/ directory


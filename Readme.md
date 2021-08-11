# Please, Read Before You Run this apps
## Requirement
* Install node.js v14.15.4 or Higher
* Install typescript on your machine
* Install MongoDB
* Insert mongodb.products.schema to your MongoDB
* Install Elasticsearch
* Mapping your Elasticsearch with map on file elasticsearch.products.mapping.json
* Configure your env base on /src/Utils/Env/env.config.ts
* Read package.json

## Commands
* ### export
  ``` npm run export ```
  <br>
  used for exporting data from MongoDB and Import to Elasticsearch.

* ### api
  ```npm run api```
  <br>
  <br>
  used for run your REST API.
  some api must have authentication, to get token you can use
  route ```/user/login```.

* ### dev
  ``` npm run dev ```
  <br>
  used for developing these apps.

## Run in Docker

```docker build -t=<your_tag(developmet or production)> .```

have any question ? <br>
please send me by e-mail : feryreza.aditya@gmail.com

### Happy Code 😄 and  Stay Safe 🙏😷 

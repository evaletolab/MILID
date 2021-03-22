# milid-frontend

## Project setup
```
npm install
```

## deployment

### requirements
the deployment scripts rely on the presence of **rsync** and **sshpass** on the system

### setup

1. make a copy of **.env.example** named **.env** 
2. fill **.env** with relevant data

### deployment

run:

```
npm run build 
npm run deploy-dev
```
to deploy to dev

or run:

```
npm run build
npm run deploy-prod
```
to deploy to prod

the deployment script does three things:
1. copies **htaccess** file to **dist** folder
2. copies **php-analytics/sqlite/src** folder to **dist/api** folder
3. rsyncs with remote

### analytics database deployment

The deployment script does not sync the sqlite database. 
**db.sqlite** (*php-analytics/sqlite*) must be copied to the remote *api* folder by hand.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

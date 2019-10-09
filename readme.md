# JWT auth server mock
Default port is 3000

```
POST /auth
username = string
password = string
```

```
POST /register
username = string
password = string
```

```$xslt
POST /refresh
refresh = string
```

JWT debugger is available at https://jwt.io/

## Starting service
```
// default port
npm start

// specified port
PORT=5000 npm start
```

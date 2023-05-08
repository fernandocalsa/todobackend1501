# TODO Backend

## Instalación de mongoose
```shell
$ npm init -y
$ npm install express
$ npm install mongoose
$ npm install nodemon --save-dev
```

## Preparar .env

Para no guardar datos sensibles en el repositorio, utilizaremos las variables de entorno. Nos permitirán que cada desarrollador o cada entorno pueda tener sus propios datos y ser utilizados dentro del código. Estas variables de entorno se almacenan en un fichero `.env`

`.env`
```
DB_USER="user"
DB_PASSWORD="password"
DB_NAME="db"
DB_SERVER="server"
```

Para acceder a las variables de entorno desde nodeJS, deberemos instalar el módulo `dotenv` y cargar la configuración (en este caso vacía ya que no necesitamos ninguna configuración especial)

```shell
$ npm install dotenv
```

`app.js`
```js
require('dotenv').config();
```

Las variables de entorno quedarán accesibles a través de la variable `process.env`

##
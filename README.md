# Proyecto de Nodejs Chatbot-APIMeta usando la librería @bot-whatsapp/bot

Este archivo README proporciona una guía paso a paso para desplegar un chatbot utilizando la API de Meta (anteriormente Facebook) con una librería de Nodejs que nos facilita el manejo del flujo y contexto de los mensajes del usuario

## Pasos a seguir

## Crear imagen de docker y subirlo en Azure

1. **Configura tu entorno de desarrollo**: Asegúrate de tener instalado Node.js y npm en tu máquina. También necesitarás Docker para construir y desplegar tu aplicación.

2. **Crea tu proyecto Node.js**: Inicia un nuevo proyecto Node.js e instala la librería que vas a utilizar para interactuar con la API de Meta. En este caso es `@bot-whatsapp`.

3. **Desarrolla tu chatbot**: Utiliza la librería que elegiste para desarrollar las funcionalidades de tu chatbot.

4. **Crea tu Dockerfile**: Crea un archivo Dockerfile en la raíz de tu proyecto para definir cómo Docker debe construir tu aplicación.

5. **Construye tu imagen Docker**: Ejecuta el siguiente comando en la terminal para construir tu imagen Docker:

   ```bash
     docker build -t <your-image-name>:<version>
   ```

   5.1 **Exponer el puerto(ejemplo puerto 3000) e inyectar el archivo .env (las variables de entorno) en la imagen de docker**:

```bash
  docker run --env-file=./<project-dir>/.env -p <local-port>:<docker-port> <your-image-name>:<version>
```

###### <project-dir> es el nombre de la carpeta de mi proyecto donde estan las funciones, package.json, .env

###### El primer puerto es de la maquina donde se ejecuta, el segundo es el puerto que expone docker

6. **Crear un grupo de recursos y un Container Registry**: Desde azure creamos nuestro grupo de recurso y dentro creamos un Container Registry para almacenar las versiones de las imagenes de docker

   6.1 **Crear un tag de la imagen desde la terminal de vscode**:

```bash
  docker tag <name-tag> <url-server-name>/<your-image-name>:<version>
```

###### Se agrega la url del servidor para que docker sepa donde subir la imagen(Tiene esta sintaxis <project-name>.azurecr.io)

6.2 **Crear permisos de repositorios en Azure**:

###### Crear un token con el scope deseado

###### Dar click en el token creado y generar un password(guardar token, solo aparece una vez)

7. **Hacer login en azure desde terminal**:

```bash
  docker login <url-server-name>

  o

  docker login -u <name-token-repository> -p <access-token> <url-server-name>
```

###### Agrega tus credenciales (username, password-key), En azure entrar en Access_Keys

8. **Push imagen docker**:

```bash
docker push <url-server-name>/<docker-image-name>:<version>
```

#### NOTA: Si no puedes ver las imagenes de docker en Azure en la parte de repositorios es por un permiso en Access Control(IAM).

##### Pasos a seguir - Add > Add Role Assignment , en Role escoger Reader y despues ir a Members y agregar el usuario al que desea asignar el permiso

## Desplegar imagen de docker en una WebApp de Azure

1. **Crear grupo de recursos o usar el mismo donde creamos el Container Registry**:

   ##### 1.1 Seleccionar tipo Docker en la creacion de la WebApp

   ##### 1.2 Escoger la imagen y el tag de la version de la imagen a desplegar

2. **Agregar la url que proporciona la WebApp en la aplicacion de Meta, ejemplo <url-azure-website>/webhook**

## Recursos

[libreria nodejs @bot-whatsapp/bot](https://bot-whatsapp.netlify.app/docs/)

[Dockerizar un proyecto de nodejs ](https://www.youtube.com/watch?v=Sg5l0rwZKs4)

[Subir imagen de docker en Azure | https://www.youtube.com/watch?v=HlqR5hn8_v8](https://www.youtube.com/watch?v=HlqR5hn8_v8)

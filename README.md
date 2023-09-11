# Actividad para Axioma

## Dependencias
Instalar las siguientes dependencias con su gestor de preferencia.
### Backend
- Python 3.10.12
- PDM 2.9.1 (Gestor de paquetes) [Sitio Oficial](https://pdm.fming.dev/2.9/)

### Frontend
- Node 16.20


Desde la terminal se puede instalar con los siguientes comandos:

```bash
# Actualizamos los paquetes e instalamos algunos básicos
sudo apt update
sudo apt upgrade -y
sudo apt install -y curl wget git

# Instalamos pyenv, un gestor de versiones de python
curl https://pyenv.run | bash

echo 'export PATH="$HOME/.pyenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc

source ~/.bashrc

# Instalamos algunas librerías necesarias para el funcionamiento correcto de pyenv
sudo apt update; sudo apt install build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev curl \
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev

# Reiniciamos la terminal
exec $SHELL

# Instalamos python 3.10.12 y lo definimos como global

pyenv install 3.10.12
pyenv global 3.10.12

# Instalamos pdm, un gestor de paquetes para python
pip install pdm==2.9.1


# Instalamos nvm, un gestor de versiones de node
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

# Volvemos a reiniciar la terminal
exec $SHELL

# Instalamos node 16
sudo apt-get remove nodejs
nvm install 16
```

## Instalación del proyecto

#### Clonar el repositorio de github
```bash
cd ~/directorio-del-proyecto/
git clone git@github.com:MatiasPineda/axioma-actividad.git .
```

Abrir dos terminales y ejecutar los siguientes comandos en cada una de ellas:

Para el Backend
```bash
cd ~/directorio-del-proyecto/backend

pdm install

pdm run python3 manage.py migrate
pdm run python3 manage.py loaddata setup_fixture.json # Datos prellenados

# El fixture ya contiene un superuser, pero se puede crear uno con el siguiente comando
pdm run python3 manage.py createsuperuser

pdm run python3 manage.py runserver
```

Para el frontend
```bash
cd ~/directorio-del-proyecto/frontend
nvm use 16 # Si no se ha definido como global
npm install
npm start
```

## Descripción de la solución

Se crearon dos aplicaciones, en Django con Django REST Framework para el backend y en React para el frontend.

El acceso por defecto a estos ambientes:
- [Puerto 8000 del localhost](http://localhost:8000/) para el backend.
- [Puerto 3000 del localhost](http://localhost:3000/) para el frontend.


### Backend y aplicación de usuarios
Se implementó un modelo custom de User para Django para cumplir con el requerimiento de DNI como identificador. Se decide eliminar username y correo del modelo.

Se genera un modelo aparte de cuentas bancarias. En este caso se tomó la decisión de separarlo del modelo de usuarios para mantener el orden sobre cuál modelo se encarga de qué.

La autenticación y autorización se maneja con JWT, que se implementaron con la librería [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/).
Se elige por ser un método estándar para mantener sesiones en aplicaciones web y por ser un método seguro.

La vista de administrador sólo existe para el modelo de usuarios, ya que el modelo de cuentas bancarias fue integrado al modelo de usuarios en un inline.

Se asociaron urls estándar para la creación de API REST:
- /admin/ para la interfaz de administrador.
- /api/users/ para el modelo de usuarios.
- /api/token/ para la solicitud de tokens.

Sólo se modificaron ligeramente algunas vistas para que se ajustaran a los requerimientos de la actividad. En este caso la vista de generación de tokens actúa como login, el cual permite manejar el requerimiento de intentos fallidos y posterior bloqueo de cuentas.

Se generó un fixture para tener datos de prueba, en el que se asignaron valores no reales a cada una de las cuentas de usuario y bancarias. Se hizo para que se vayan probando los bloqueos y el despliegue de valores en el frontend.

A continuación la tabla con usuarios disponibles.

| DNI      | Contraseña | Nombres       | Apellidos       | Super usuario |
|----------|------------|---------------|-----------------|----|
| 10236745 |  10236745  | Luis          | Martínez Pérez  |    |
| 11459876 |  11459876  | Ana María     | García Sánchez  |    |
| 12345678 |  password  | Administrador | de Banco        | Si |
| 12569843 |  12569843  | Carlos        | Fernández López |    |
| 13675421 |  13675421  | Laura         | Sánchez Pérez   |    |
| 14782396 |  14782396  | Javier        | Ramírez García  |    |
| 15987432 |  15987432  | Marta         | Díaz Rodríguez  |    |
| 16123578 |  16123578  | Pedro         | López Martínez  |    |
| 8223567  |  8223567   | Juan Carlos   | Pérez González  |    |
| 9124589  |  9124589   | María         | López Rodríguez |    |

Existe una [vista de administrador](http://localhost:8000/admin) para el backend al cual sólo tienen acceso los superusuarios.
En esta vista se puede hacer el desbloqueo de usuarios que ya tienen 3 intentos de login fallidos.
Sólo hay que desmarcar la opcion `Bloqueado` en la vista de edición de usuarios y guardar.

### Frontend
Se implementó una aplicación en React para el frontend, inicializada con `npx create-react-app`, por su simpleza a la hora de desarrollar demos y actividades cuyo tiempo es limitado.

Se implementaron dos vistas con sus respectivas rutas:
- `/`: para el login. Se accede a la [página sugerida en la actividad](login.portal.bancochile.cl) y se intenta imitar lo más posible el login.
- `/account`: para la muestra de los datos de la cuenta. Al no tener acceso personal a esta vista y sólo depender de una captura de pantalla, se intentó imitar la forma.

No se permite el acceso a `/account` sin haber ingresado las credenciales y sólo se puede volver a `/` si se oprime el botón `Salir` que ejecuta un logout

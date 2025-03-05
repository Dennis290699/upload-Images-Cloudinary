# 📂 Upload Images to Cloudinary  

Este proyecto permite subir imágenes organizadas en subdirectorios a **Cloudinary** automáticamente, evitando duplicados y generando un archivo JSON con las URLs de las imágenes subidas.  

## 🚀 **Características**  
✅ Carga imágenes desde un directorio local a **Cloudinary** respetando la estructura de carpetas.  
✅ Evita subir imágenes duplicadas si ya existen en Cloudinary.  
✅ Genera un archivo JSON con las URLs de las imágenes almacenadas en **Cloudinary**.  

---

## 🛠 **Requisitos**  

📌 Asegúrate de tener instalado:  
- **Node.js** (versión 14 o superior)  
- **Una cuenta en Cloudinary**  
- **Una carpeta con imágenes organizadas en subdirectorios**  

---

## ⚙️ **Configuración**  

### 1️⃣ Clonar el repositorio  
```sh
git clone https://github.com/Dennis290699/upload-Images-Cloudinary.git
cd upload-Images-Cloudinary
```

### 2️⃣ Instalar dependencias  
```sh
npm install
```

### 3️⃣ Configurar Cloudinary  
Crea un archivo **`.env`** en la raíz del proyecto y añade tus credenciales de **Cloudinary**:  
```env
CLOUDINARY_CLOUD_NAME=tu_nombre_de_cloudinary
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

---

## ⚙️ **Configuración e inicialización NodeJs** 
En el caso de querer inicializar el proyecto desde cero, puedes ejecutar los siguientes comandos: 

```sh
npm init -y
npm install dotenv cloudinary fs-extra path
```

---

## 📤 **Subir imágenes a Cloudinary**  
Ejecuta el siguiente comando para subir las imágenes desde la carpeta `assets/` a Cloudinary:  
```sh
node scripts/upload.js
```
🎉 Al finalizar, verás en la terminal las URLs de las imágenes subidas.  

---

## 📥 **Generar JSON con URLs de imágenes**  
Para obtener las URLs de todas las imágenes almacenadas en **Cloudinary**, ejecuta:  
```sh
node scripts/generateUrls.js
```
✅ El archivo **`data/images-cloudinary.json`** se actualizará con las URLs organizadas por proyecto.  

---

## 📂 **Estructura del Proyecto**  

```
upload-Images-Cloudinary/
│── assets/                   # Carpeta con imágenes organizadas en subdirectorios
│   ├── project-1/
│   │   ├── 1.png
│   │   ├── 2.png
│   ├── project-2/
│       ├── 1.png
│── data/                      # JSON con URLs generadas
│   ├── images-cloudinary.json
│── scripts/                   # Scripts de automatización
│   ├── upload.js
│   ├── generateUrls.js
│── .env                       # Configuración de Cloudinary
│── package.json
│── README.md
```

---

## 📌 **Ejemplo del archivo JSON generado**  
El script `generateUrls.js` guardará las URLs en `data/images-cloudinary.json`, con la siguiente estructura:  

```json
{
  "project-1": [
    "https://res.cloudinary.com/tu_cloud/image/upload/v12345/assets-portfolio/project-1/1.png",
    "https://res.cloudinary.com/tu_cloud/image/upload/v12345/assets-portfolio/project-1/2.png"
  ],
  "project-2": [
    "https://res.cloudinary.com/tu_cloud/image/upload/v12345/assets-portfolio/project-2/1.png"
  ]
}
```

---

## 📝 **Notas**  
- Puedes ejecutar `upload.js` cada vez que agregues imágenes nuevas. Solo subirá las imágenes que aún no existan en Cloudinary.  
- `generateUrls.js` recuperará todas las imágenes almacenadas en Cloudinary, incluso las subidas anteriormente.  
- Modifica `assets-portfolio` en los scripts si quieres cambiar el nombre de la carpeta en Cloudinary.  

📢 **¡Listo! Ahora puedes gestionar imágenes en Cloudinary de forma automática!** 🚀  

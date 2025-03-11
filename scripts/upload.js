require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs-extra");
const path = require("path");

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Ruta de la carpeta local con imágenes
const ASSETS_DIR = path.join(__dirname, "../assets");

const uploadImages = async () => {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.log("❌ La carpeta 'assets/' no existe.");
    return;
  }

  const projects = await fs.readdir(ASSETS_DIR);

  for (const project of projects) {
    const projectPath = path.join(ASSETS_DIR, project);

    if (!fs.statSync(projectPath).isDirectory()) continue;

    const images = await fs.readdir(projectPath);

    for (const image of images) {
      const imagePath = path.join(projectPath, image);
      const imageName = path.parse(image).name; // Evita doble extensión
      const extension = path.extname(image); // Obtener extensión original
      const cloudinaryPath = `assets-portfolio/${project}/${imageName}`;

      try {
        // Verificar si la imagen ya existe en Cloudinary
        const exists = await cloudinary.search
          .expression(`public_id="${cloudinaryPath}"`)
          .execute();

        if (exists.total_count > 0) {
          console.log(`✅ ${cloudinaryPath} ya está en Cloudinary. Omitiendo...`);
          continue;
        }

        // Subir imagen con optimización (sin `format: "auto"`)
        const result = await cloudinary.uploader.upload(imagePath, {
          public_id: cloudinaryPath,
          folder: `assets-portfolio/${project}`,
          quality: "auto:low", // Reduce la calidad sin perder mucha nitidez
          overwrite: false, // No sobrescribe archivos existentes
        });

        console.log(`⬆️ Subida optimizada: ${result.secure_url}`);
      } catch (error) {
        console.error(`⚠️ Error al subir ${image}:`, error.message);
      }
    }
  }
  console.log("🎉 ¡Proceso de subida optimizada completado!");
};

// Ejecutar script
uploadImages();

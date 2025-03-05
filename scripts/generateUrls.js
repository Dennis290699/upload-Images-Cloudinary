require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs-extra");
const path = require("path");

const OUTPUT_FILE = path.join(__dirname, "../data/images-cloudinary.json");

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Función para obtener imágenes desde Cloudinary
const fetchCloudinaryImages = async () => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:assets-portfolio/*") // Busca imágenes en la carpeta "assets-portfolio"
      .max_results(500)
      .execute();

    const imagesByProject = {};

    resources.forEach((image) => {
      const parts = image.public_id.split("/");
      const project = parts[1];

      if (!imagesByProject[project]) {
        imagesByProject[project] = [];
      }
      imagesByProject[project].push(image.secure_url);
    });

    await fs.outputJson(OUTPUT_FILE, imagesByProject, { spaces: 2 });
    console.log(`✅ URLs guardadas en ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("⚠️ Error al obtener imágenes:", error.message);
  }
};

fetchCloudinaryImages();

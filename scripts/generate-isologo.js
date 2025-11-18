import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT = path.resolve(__dirname, '../public/logos/mesa-isotipo.png');
const OUTPUT = path.resolve(__dirname, '../public/logos/clientky-isotipo-500.png');
const PRIMARY = '#7c3aed';

async function run() {
  try {
    await sharp(INPUT)
      .resize(500, 500, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .tint(PRIMARY)
      .flatten({ background: '#ffffff' })
      .toFile(OUTPUT);

    console.log(`Isologo generado en ${OUTPUT}`);
  } catch (error) {
    console.error('No se pudo generar el isologo:', error);
    process.exit(1);
  }
}

run();





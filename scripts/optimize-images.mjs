import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, '..', 'public', 'images');

async function processFile(filePath) {
  const stat = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  const originalSizeMB = (stat.size / 1024 / 1024).toFixed(2);
  const inputBuffer = fs.readFileSync(filePath);
  const metadata = await sharp(inputBuffer).metadata();
  console.log(`\nProcessing: ${path.basename(filePath)} (${metadata.width}x${metadata.height}, ${metadata.format}, ${originalSizeMB} MB)`);

  const maxDimension = 1400;
  let pipeline = sharp(inputBuffer);

  if (metadata.width > maxDimension || metadata.height > maxDimension) {
    pipeline = pipeline.resize({
      width: metadata.width >= metadata.height ? maxDimension : undefined,
      height: metadata.height > metadata.width ? maxDimension : undefined,
      withoutEnlargement: true,
      fit: 'inside'
    });
  }

  let outputBuffer;
  if (ext === '.png') {
    // Check if it's hero-main.png (photo masquerading as PNG)
    if (path.basename(filePath) === 'hero-main.png') {
      // Create high quality compressed PNG
      outputBuffer = await pipeline
        .png({ quality: 80, compressionLevel: 9, palette: true })
        .toBuffer();
    } else {
      outputBuffer = await pipeline
        .png({ quality: 85, compressionLevel: 9 })
        .toBuffer();
    }
  } else if (ext === '.jpg' || ext === '.jpeg') {
    outputBuffer = await pipeline
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toBuffer();
  } else if (ext === '.webp') {
    outputBuffer = await pipeline
      .webp({ quality: 80 })
      .toBuffer();
  }

  if (outputBuffer && outputBuffer.length < stat.size) {
    fs.writeFileSync(filePath, outputBuffer);
    const newSizeMB = (outputBuffer.length / 1024 / 1024).toFixed(2);
    const savingsPct = (((stat.size - outputBuffer.length) / stat.size) * 100).toFixed(1);
    console.log(`  -> Optimized: ${newSizeMB} MB (${outputBuffer.length} bytes, Saved ${savingsPct}%)`);
  } else {
    console.log(`  -> Kept original (no compression benefit)`);
  }

  // Also generate a modern .webp version alongside it if not already .webp
  if (ext !== '.webp') {
    const webpPath = filePath.substring(0, filePath.lastIndexOf('.')) + '.webp';
    const webpBuffer = await sharp(inputBuffer)
      .resize({
        width: metadata.width > maxDimension ? maxDimension : undefined,
        height: metadata.height > maxDimension && metadata.height > metadata.width ? maxDimension : undefined,
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 80 })
      .toBuffer();
    fs.writeFileSync(webpPath, webpBuffer);
    const webpSizeMB = (webpBuffer.length / 1024 / 1024).toFixed(2);
    console.log(`  -> WebP version created: ${path.basename(webpPath)} (${webpSizeMB} MB)`);
  }
}

async function run() {
  const files = fs.readdirSync(imagesDir);
  for (const f of files) {
    const full = path.join(imagesDir, f);
    const stat = fs.statSync(full);
    if (stat.isFile() && !f.endsWith('.tmp')) {
      await processFile(full);
    }
  }

  const insurersDir = path.join(imagesDir, 'insurers');
  if (fs.existsSync(insurersDir)) {
    const insurerFiles = fs.readdirSync(insurersDir);
    for (const f of insurerFiles) {
      const full = path.join(insurersDir, f);
      if (fs.statSync(full).isFile() && !f.endsWith('.tmp')) {
        await processFile(full);
      }
    }
  }
}

run().catch(console.error);

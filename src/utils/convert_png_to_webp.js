const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = __dirname;

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const pngFiles = files.filter(file => file.endsWith('.png'));

  if (pngFiles.length === 0) {
    console.log('No PNG files found in the images directory.');
    return;
  }

  pngFiles.forEach(pngFile => {
    const inputPath = path.join(imagesDir, pngFile);
    const outputFileName = path.basename(pngFile, '.png') + '.webp';
    const outputPath = path.join(imagesDir, outputFileName);

    sharp(inputPath)
      .webp()
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.error(`Error converting ${pngFile} to WebP:`, err);
        } else {
          console.log(`Successfully converted ${pngFile} to ${outputFileName}`);
        }
      });
  });
});

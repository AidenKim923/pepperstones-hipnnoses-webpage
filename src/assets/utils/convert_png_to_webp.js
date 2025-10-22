const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../images');

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));

  if (pngFiles.length === 0) {
    console.log('No PNG files found in the images directory.');
    return;
  }

  pngFiles.forEach(pngFile => {
    const inputPath = path.join(imagesDir, pngFile);
    const outputFileName = path.basename(pngFile, path.extname(pngFile)) + '.webp';
    const outputPath = path.join(imagesDir, outputFileName);

    sharp(inputPath)
      .webp()
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.error(`Error converting ${pngFile} to WebP:`, err);
        } else {
          console.log(`Successfully converted ${pngFile} to ${outputFileName}`);

          fs.unlink(inputPath, (unlinkErr) => {
            if (unlinkErr) {
              console.error(`Error deleting original PNG file ${pngFile}:`, unlinkErr);
            } else {
              console.log(`Successfully deleted original PNG file ${pngFile}`);
            }
          });
        }
      });
  });
});

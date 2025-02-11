const webp = require('webp-converter');
const fs = require('fs');
const path = require('path');

function convertPngToWebp(inputPath, outputPath) {
    try {
        webp.cwebp(inputPath, outputPath, "-q 100");
    } catch (error) {
        console.error('Error converting image:', error);
    }
}

if (!fs.existsSync('./png')) {
    fs.mkdirSync('./png');
}

if (fs.existsSync('./webp')) {
    fs.rmSync('./webp', { recursive: true, force: true });
}

fs.mkdirSync('./webp');

fs.readdir('./png', (err, files) => {
    if (err) {
        console.error('Error reading files:', err);
        return;
    }

    files.filter(file => path.extname(file) === '.png')
    .forEach(file => {
        const outputFileName = file.replace('.png', '.webp');
        convertPngToWebp(path.join('./png', file), path.join('./webp', outputFileName));
    });
});

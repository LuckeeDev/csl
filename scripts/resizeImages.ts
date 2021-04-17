import * as fs from 'fs';
import { join } from 'path';
import * as sharp from 'sharp';
import * as fse from 'fs-extra';

const workingDir = join(__dirname, 'data', 'images');
const resizedDir = join(__dirname, 'data', 'resized');
const dir = fs.readdirSync(workingDir);

const uploadPromises = dir.map(async (fileName) => {
	await fse.ensureDir(resizedDir);

	const filePath = join(workingDir, fileName);

	const pngFileName = fileName.split('.').shift() + '.png';

	const newFileName = `500@${pngFileName}`;
	const newFilePath = join(resizedDir, newFileName);

	await sharp(filePath)
		.toFormat('png')
		.resize({
			width: 500,
			height: 500,
			fit: 'contain',
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		})
		.toFile(newFilePath);

	return newFilePath;
});

Promise.all(uploadPromises).then(console.log);

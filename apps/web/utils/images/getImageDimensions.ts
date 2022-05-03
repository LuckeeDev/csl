export async function getImageDimensions(
	file: File
): Promise<{ height: number; width: number }> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		const objectUrl = URL.createObjectURL(file);

		image.onload = () => {
			resolve({ height: image.height, width: image.width });
		};

		image.onerror = (err) => {
			reject(err);
		};

		image.src = objectUrl;
	});
}

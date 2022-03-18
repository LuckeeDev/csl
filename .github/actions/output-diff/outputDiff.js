import core from '@actions/core';
import { readFileSync, writeFileSync } from 'fs';
import { ensureFileSync } from 'fs-extra';

try {
	const beforePath = __dirname.replace(
		'.github/actions/output-diff',
		core.getInput('before-path')
	);
	const afterPath = __dirname.replace(
		'.github/actions/output-diff',
		core.getInput('after-path')
	);
	const diffPath = __dirname.replace(
		'.github/actions/output-diff',
		core.getInput('diff-path')
	);

	const before = readFileSync(beforePath, 'utf-8');
	const after = readFileSync(afterPath, 'utf-8');

	const linesBefore = before.split('\n');
	const linesAfter = after.split('\n');

	console.log('✅ Files read');

	const differentLines = [];

	let oldIndex = 0;
	for (const line of linesAfter) {
		if (line === linesBefore[oldIndex]) {
			oldIndex += 1;
		} else {
			differentLines.push(line);
		}
	}

	const diff = differentLines.join('\n');

	console.log('✅ Diff was successfully generated');

	ensureFileSync(diffPath);

	writeFileSync(diffPath, diff);

	console.log('✅ Output diff');
} catch (error) {
	console.error('❌ An error happened');
	core.setFailed(error.message);
}

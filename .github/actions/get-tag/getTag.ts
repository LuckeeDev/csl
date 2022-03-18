import core from '@actions/core';
import { readFileSync } from 'fs';

try {
	const diffPath = __dirname.replace(
		'.github/actions/output-diff',
		core.getInput('diff-path')
	);

	const diffContent = readFileSync(diffPath, 'utf-8');

	const tag = diffContent.match(/[0-9]+.[0-9]+.[0-9]+/)[0];

	core.setOutput('tag', tag);
} catch (error) {
	console.error('❌ An error happened');
	core.setFailed(error.message);
}

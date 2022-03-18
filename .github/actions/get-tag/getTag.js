const core = require('@actions/core');
const { readFileSync } = require('fs');

try {
	const diffPath = __dirname.replace(
		'.github/actions/output-diff',
		core.getInput('diff-path')
	);

	const diffContent = readFileSync(diffPath, 'utf-8');

	console.log('✅ Files read');

	const tag = diffContent.match(/[0-9]+.[0-9]+.[0-9]+/)[0];

	core.setOutput('tag', tag);

	console.log('✅ Output tag');
} catch (error) {
	console.error('❌ An error happened');
	core.setFailed(error.message);
}

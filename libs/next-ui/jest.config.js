module.exports = {
	displayName: 'next-ui',
	preset: '../../jest.preset.js',
	transform: {
		'^.+\\.[tj]sx?$': 'babel-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/libs/next-ui',
};

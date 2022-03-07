import { Loader } from '@mantine/core';

export default function LoaderDiv() {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: 80,
				width: '100%',
			}}
		>
			<Loader />
		</div>
	);
}

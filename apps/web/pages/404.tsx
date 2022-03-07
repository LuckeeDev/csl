import { Button } from '@mantine/core';
import { useRouter } from 'next/router';

export default function NotFoundPage() {
	const router = useRouter();

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<h1>404!</h1>

			<Button onClick={() => router.back()}>Torna indietro</Button>
		</div>
	);
}

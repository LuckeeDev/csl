import { ActionIcon } from '@mantine/core';
import { ArrowLeftIcon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface BackHeadingProps {
	children: ReactNode;
}

export default function BackHeading({ children }: BackHeadingProps) {
	const router = useRouter();

	function goBack() {
		router.back();
	}

	return (
		<div
			style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
		>
			<ActionIcon
				size="lg"
				variant="hover"
				color="primary"
				sx={{ marginRight: '5px' }}
				onClick={() => goBack()}
			>
				<ArrowLeftIcon />
			</ActionIcon>

			<h1>{children}</h1>
		</div>
	);
}

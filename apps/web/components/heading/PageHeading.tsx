import { ActionIcon, Loader } from '@mantine/core';
import { ArrowLeftIcon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface PageHeadingProps {
	children: ReactNode;
	loading?: boolean;
	back?: boolean;
}

export default function PageHeading({
	children,
	back,
	loading,
}: PageHeadingProps) {
	const router = useRouter();

	function goBack() {
		router.back();
	}

	return (
		<div
			style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
		>
			{back && (
				<ActionIcon
					size="lg"
					variant="hover"
					color="primary"
					sx={{ marginRight: '5px' }}
					onClick={() => goBack()}
				>
					<ArrowLeftIcon />
				</ActionIcon>
			)}

			<h1>{children}</h1>

			{loading && <Loader size="sm" ml="xs" />}
		</div>
	);
}

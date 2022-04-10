import { ActionIcon, Loader } from '@mantine/core';
import { ArrowLeftIcon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';

interface PageHeadingProps {
	children: ReactNode;
	loading?: boolean;
	back?: boolean;
	type?: 'h1' | 'h2';
}

export default function PageHeading({
	children,
	back,
	loading,
	type,
}: PageHeadingProps) {
	const router = useRouter();

	function goBack() {
		router.back();
	}

	const headingComponent = useMemo(() => {
		switch (type) {
			case 'h1':
				return <h1>{children}</h1>;
			case 'h2':
				return <h2>{children}</h2>;
			default:
				return <h1>{children}</h1>;
		}
	}, [type, children]);

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

			{headingComponent}

			{loading && <Loader size="sm" ml="xs" />}
		</div>
	);
}

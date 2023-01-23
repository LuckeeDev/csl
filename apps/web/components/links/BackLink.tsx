import { Anchor, AnchorProps, useMantineTheme } from '@mantine/core';
import { ArrowLeftIcon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';

export default function BackLink({ children, ...props }: AnchorProps) {
	const router = useRouter();
	const theme = useMantineTheme();

	return (
		<Anchor
			style={{ display: 'flex', alignItems: 'center' }}
			{...props}
			onClick={() => router.back()}
		>
			<ArrowLeftIcon style={{ marginRight: theme.spacing.xs }} />

			{children}
		</Anchor>
	);
}

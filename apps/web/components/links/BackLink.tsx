import { Anchor, AnchorProps, useMantineTheme } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
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
			<IconArrowLeft style={{ marginRight: theme.spacing.xs }} />

			{children}
		</Anchor>
	);
}

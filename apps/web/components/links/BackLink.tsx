import { Anchor, AnchorProps, useMantineTheme } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function BackLink({ children, ...props }: AnchorProps & { children: ReactNode }) {
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

import { Anchor, AnchorProps } from '@mantine/core';
import Link from 'next/link';

export default function TextLink({
	href,
	children,
	...props
}: AnchorProps<'a'>) {
	return (
		<Link href={href} passHref>
			<Anchor {...props}>{children}</Anchor>
		</Link>
	);
}

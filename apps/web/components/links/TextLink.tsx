import { Anchor, AnchorProps } from '@mantine/core';
import Link from 'next/link';

interface TextLinkProps extends AnchorProps<'a'> {
	href: string;
}

export default function TextLink({ href, children, ...props }: TextLinkProps) {
	return (
		<Link href={href} passHref>
			<Anchor {...props}>{children}</Anchor>
		</Link>
	);
}

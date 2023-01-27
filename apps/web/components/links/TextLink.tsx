import { Anchor, AnchorProps } from '@mantine/core';
import Link from 'next/link';

interface TextLinkProps extends AnchorProps {
	href: string;
	target?: string;
}

export default function TextLink({ href, children, ...props }: TextLinkProps) {
	return (
		<Link href={href} passHref legacyBehavior>
			<Anchor {...props}>{children}</Anchor>
		</Link>
	);
}

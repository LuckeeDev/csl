import { Anchor, AnchorProps } from '@mantine/core';
import Link from 'next/link';
import {ReactNode} from 'react';

interface TextLinkProps extends AnchorProps {
	href: string;
	target?: string;
	children?: ReactNode;
}

export default function TextLink({ href, children, ...props }: TextLinkProps) {
	return <Anchor component={Link} href={href} {...props}>{children}</Anchor>;
}

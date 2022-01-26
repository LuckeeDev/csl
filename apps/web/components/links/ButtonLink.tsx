import { Button, ButtonProps } from '@mantine/core';
import Link from 'next/link';

interface ButtonLinkProps extends ButtonProps<'a'> {
	href: string;
}

export default function ButtonLink({
	href,
	children,
	...props
}: ButtonLinkProps) {
	return (
		<Link href={href} passHref>
			<Button {...props} component="a">
				{children}
			</Button>
		</Link>
	);
}

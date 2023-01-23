import { Button, ButtonProps } from '@mantine/core';
import Link from 'next/link';

interface ButtonLinkProps extends ButtonProps {
	href: string;
	replace?: boolean;
}

export default function ButtonLink({
	href,
	children,
	replace,
	...props
}: ButtonLinkProps) {
	return (
		<Link href={href} passHref replace={replace} legacyBehavior>
			<Button {...props} component="a">
				{children}
			</Button>
		</Link>
	);
}

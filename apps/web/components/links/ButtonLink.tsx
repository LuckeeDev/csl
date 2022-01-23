import { Button, ButtonProps } from '@mantine/core';
import Link from 'next/link';

export default function ButtonLink({
	href,
	children,
	...props
}: ButtonProps<'a'>) {
	return (
		<Link href={href} passHref>
			<Button {...props} component="a">
				{children}
			</Button>
		</Link>
	);
}

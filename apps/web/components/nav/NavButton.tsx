import { Button } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';

interface NavButtonProps {
	children: ReactNode;
	href: string;
}

export default function NavButton({ children, href }: NavButtonProps) {
	return (
		<Link href={href} passHref>
			<Button fullWidth variant="subtle" size="md" component="a">
				{children}
			</Button>
		</Link>
	);
}

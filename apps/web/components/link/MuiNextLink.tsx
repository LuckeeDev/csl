import Link from 'next/link';
import { Link as MuiLink, LinkProps } from '@mui/material';

export default function MuiNextLink({
	href,
	children,
	...props
}: LinkProps) {
	return (
		<Link href={href} passHref>
			<MuiLink {...props}>{children}</MuiLink>
		</Link>
	);
}

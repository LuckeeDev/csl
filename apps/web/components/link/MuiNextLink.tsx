import Link from 'next/link';
import { Link as MuiLink, LinkProps } from '@mui/material';

interface MuiNextLinkProps extends LinkProps {
	children: string;
}

export default function MuiNextLink({
	href,
	children,
	...props
}: MuiNextLinkProps) {
	return (
		<Link href={href} passHref>
			<MuiLink {...props}>{children}</MuiLink>
		</Link>
	);
}

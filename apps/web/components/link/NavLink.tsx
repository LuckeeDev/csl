import { Theme } from '@mui/material';
import styled from '@mui/styled-engine';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import MuiNextLink, { MuiNextLinkProps } from './MuiNextLink';

const FULL_WIDTH = '100%';
const NO_WIDTH = '0%';

interface StyledNavLinkProps extends MuiNextLinkProps {
	theme?: Theme;
	width: string;
}

const StyledNavLink = styled(MuiNextLink)(
	({ theme, width }: StyledNavLinkProps) => ({
		position: 'relative',
		'::after': {
			backgroundColor: theme.palette.primary.main,
			content: '""',
			height: '2px',
			width,
			display: 'block',
			position: 'absolute',
			bottom: '0',
			left: '0',
			transition: 'all .2s ease-in-out',
		},
	})
);

export default function NavLink({
	href,
	children,
	...props
}: MuiNextLinkProps) {
	const router = useRouter();

	const width = useMemo(() => {
		const isActive = router.route === href;

		if (isActive) {
			return FULL_WIDTH;
		} else {
			return NO_WIDTH;
		}
	}, [router, href]);

	return (
		<StyledNavLink {...props} underline="always" href={href} width={width}>
			{children}
		</StyledNavLink>
	);
}

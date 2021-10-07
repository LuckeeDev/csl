import { Theme } from '@mui/material';
import styled from '@mui/styled-engine';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import MuiNextLink, { MuiNextLinkProps } from './MuiNextLink';

interface StyledNavLinkProps extends MuiNextLinkProps {
	theme?: Theme;
}

const StyledNavLink = styled(MuiNextLink)(({ theme }: StyledNavLinkProps) => {
	const activeColor = theme?.palette.primary.main;
	const baseColor = theme?.palette.primary.dark;

	return {
		position: 'relative',
		width: 'auto',
		color: baseColor,
		':hover': {
			color: activeColor,
		},
		'::after': {
			backgroundColor: activeColor,
			content: '""',
			height: '2px',
			width: '0%',
			display: 'block',
			position: 'absolute',
			bottom: '0',
			left: '0',
			transition: 'width .2s ease-in-out',
		},
		'&.active': {
			color: activeColor,
		},
		'&.active::after': {
			width: '100%',
		},
	};
});

export default function NavLink({
	href,
	children,
	...props
}: MuiNextLinkProps) {
	const router = useRouter();

	const isActive = useMemo(() => {
		return router.route === href;
	}, [router, href]);

	return (
		<StyledNavLink
			{...props}
			underline="none"
			href={href}
			className={isActive ? 'active' : ''}
		>
			{children}
		</StyledNavLink>
	);
}

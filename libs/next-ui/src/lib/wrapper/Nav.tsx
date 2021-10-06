import styled from '@emotion/styled';
import { Button, useTheme } from '@mui/material';
import { NavLinkData } from '@csl/types';
import { ReactNode } from 'react';
import { Person } from '@mui/icons-material';
import { MuiNextLink, NavLink } from '../link';

interface StyledNavProps {
	backgroundColor: string;
	shadow: string;
}

const StyledNav = styled.nav`
	position: sticky;
	background-color: ${(props: StyledNavProps) => props.backgroundColor};

	display: flex;
	justify-content: space-between;
	align-items: center;

	height: 80px;
	width: 100%;

	box-shadow: ${(props: StyledNavProps) => props.shadow};
`;

interface NavProps {
	links: NavLinkData[];
	logo: ReactNode;
	themeSwitch: ReactNode;
}

function Nav(props: NavProps) {
	const theme = useTheme();

	return (
		<StyledNav
			shadow={theme.shadows[4]}
			backgroundColor={theme.palette.background.default}
		>
			{props.logo}

			<div>
				{props.links.map(({ href, label }, i) => (
					<NavLink href={href} margin="0 10px" key={i}>
						{label}
					</NavLink>
				))}
			</div>

			<div>
				{props.themeSwitch}
				<Button startIcon={<Person />}>
					Account
				</Button>
			</div>
		</StyledNav>
	);
}

export default Nav;

import styled from '@emotion/styled';
import { Button, IconButton, useTheme } from '@mui/material';
import { NavLinkData } from '@csl/types';
import { Person } from '@mui/icons-material';
import { NavLink } from '../link';
import Link from 'next/link';
import useSession from '@/hooks/session/useSession';
import { Menu } from '@mui/icons-material';
import ThemeSwitch from '../switch/ThemeSwitch';
import Logo from './Logo';

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

	box-sizing: border-box;
	padding: 0 10px;

	height: 80px;
	width: 100%;

	box-shadow: ${(props: StyledNavProps) => props.shadow};
`;

const FlexDiv = styled.div`
	display: flex;
	align-items: center;
`;


interface NavProps {
	links: NavLinkData[];
	onMenuClick: () => void;
	isPhone: boolean;
}

function Nav(props: NavProps) {
	const theme = useTheme();
	const { user } = useSession();

	return (
		<StyledNav
			shadow={theme.shadows[4]}
			backgroundColor={theme.palette.background.default}
		>
			<FlexDiv>
				{props.isPhone && (
					<IconButton onClick={props.onMenuClick}>
						<Menu />
					</IconButton>
				)}

				<Logo />
			</FlexDiv>

			{!props.isPhone && (
				<div>
					{props.links.map(({ href, label }, i) => (
						<NavLink href={href} margin="0 10px" key={i}>
							{label}
						</NavLink>
					))}
				</div>
			)}

			<div>
				<ThemeSwitch />

				<Link href={user ? '/account' : '/auth/login'} passHref>
					<Button startIcon={<Person />}>{user ? 'Account' : 'Login'}</Button>
				</Link>
			</div>
		</StyledNav>
	);
}

export default Nav;

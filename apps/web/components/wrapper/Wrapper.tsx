import { NavLinkData } from '@csl/types';
import { Drawer, useMediaQuery } from '@mui/material';
import { ReactNode, useState } from 'react';
import Nav from './Nav';
import { Router } from 'next/router';
import DrawerList from './DrawerList';
import styled from '@emotion/styled';
import Footer from './Footer';

interface WrapperProps {
	children: ReactNode;
	links: NavLinkData[];
}

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	box-sizing: border-box;
`;

export default function Wrapper(props: WrapperProps) {
	const [open, setOpen] = useState(false);
	const isPhone = useMediaQuery('(max-width: 768px)');

	Router.events.on('routeChangeComplete', () => setOpen(false));

	return (
		<StyledWrapper>
			<Nav
				isPhone={isPhone}
				onMenuClick={() => setOpen(true)}
				links={props.links}
			/>

			{isPhone && (
				<Drawer open={open}>
					<DrawerList links={props.links} onClickAway={() => setOpen(false)} />
				</Drawer>
			)}

			<main>{props.children}</main>

			<Footer />
		</StyledWrapper>
	);
}

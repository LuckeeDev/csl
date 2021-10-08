import { NavLinkData } from '@csl/types';
import {
	Box,
	ClickAwayListener,
	List,
	ListItemButton,
	ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './Logo';

interface DrawerListProps {
	links: NavLinkData[];
	onClickAway: () => void;
}

export default function DrawerList(props: DrawerListProps) {
	const router = useRouter();

	return (
		<ClickAwayListener onClickAway={props.onClickAway}>
			<Box sx={{ width: 300, paddingTop: 1 }} role="presentation">
				<Logo />

				<List>
					{props.links.map(({ href, label }, i) => (
						<Link href={href} passHref key={i}>
							<ListItemButton selected={href === router.route}>
								<ListItemText primary={label} />
							</ListItemButton>
						</Link>
					))}
				</List>
			</Box>
		</ClickAwayListener>
	);
}

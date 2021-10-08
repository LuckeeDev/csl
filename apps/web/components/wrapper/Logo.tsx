import { useTheme } from '@mui/material';
import Image from 'next/image';
import WhiteLogo from '@/public/img/logo-white.png';
import DefaultLogo from '@/public/img/logo-default.png';
import Link from 'next/link';
import styled from '@emotion/styled';

const StyledLink = styled.a`
	margin: 0;
	padding: 0;
	text-decoration: none;
	color: inherit;
	display: flex;
	align-items: center;
`;

export default function Logo() {
	const theme = useTheme();

	return (
		<Link href="/" passHref>
			<StyledLink>
				<Image
					src={theme.palette.mode === 'dark' ? WhiteLogo : DefaultLogo}
					alt="CSL Logo"
					height={80}
					width={80}
				/>
			</StyledLink>
		</Link>
	);
}

import { useTheme } from '@mui/material';
import Image from 'next/image';
import WhiteLogo from '@/public/img/logo-white.png';
import DefaultLogo from '@/public/img/logo-default.png';

export default function Logo() {
	const theme = useTheme();

	return (
		<Image
			src={theme.palette.mode === 'dark' ? WhiteLogo : DefaultLogo}
			alt="CSL Logo"
			height={80}
			width={80}
		/>
	);
}

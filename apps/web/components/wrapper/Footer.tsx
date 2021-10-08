import styled from '@emotion/styled';
import { Divider } from '@mui/material';
import { MuiNextLink } from '../link';
import PackageJSON from '../../../../package.json';

const StyledFooter = styled.div`
	height: 100px;
	margin-top: auto;
`;

const StyledFooterContent = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const StyledFooterParagraph = styled.p`
	margin: 0;
	text-align: center;
`;

export default function Footer() {
	const version = PackageJSON.version;

	return (
		<StyledFooter>
			<Divider />

			<StyledFooterContent>
				<StyledFooterParagraph>
					Part of the{' '}
					<MuiNextLink href="https://github.com/LuckeeDev/csl" target="_blank">
						CSL project
					</MuiNextLink>
					, read our <MuiNextLink href="/privacy">privacy policy</MuiNextLink>{' '}
					and <MuiNextLink href="/tos">terms of service</MuiNextLink>.
				</StyledFooterParagraph>

				<StyledFooterParagraph>Version {version}</StyledFooterParagraph>
			</StyledFooterContent>
		</StyledFooter>
	);
}

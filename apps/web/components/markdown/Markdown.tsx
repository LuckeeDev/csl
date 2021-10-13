import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { MuiNextLink } from '../link';

export const StyledMarkdownImage = styled.img`
	max-width: 100%;
	max-height: 400px;
	height: auto;
	align-self: center;
	display: block;
	margin: 0 auto;
`;

const StyledCaption = muiStyled('caption')(({ theme }) => ({
	color: theme.palette.text.secondary,
	alignSelf: 'center',
	display: 'block',
	margin: '0 auto',
}));

interface MarkdownProps {
	children: string;
}

export default function Markdown({ children }: MarkdownProps) {
	return (
		<ReactMarkdown
			components={{
				a(props) {
					return <MuiNextLink href={props.href}>{props.children}</MuiNextLink>;
				},
				img(props) {
					return (
						<>
							<StyledMarkdownImage src={props.src} alt={props.alt} />
							{props.alt && <StyledCaption>{props.alt}</StyledCaption>}
						</>
					);
				},
			}}
		>
			{children}
		</ReactMarkdown>
	);
}

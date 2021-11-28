import { styled } from '@mui/material';

const StyledHeroSection = styled('div')`
	display: grid;
	grid-template-columns: 50% 50%;
	height: 400px;

	.text {
		align-self: center;

		.title,
		.description {
			margin: 0;
		}

		.description {
			font-weight: normal;

			color: ${(props) => props.theme.palette.text.secondary};
		}
	}

	.image {
		width: 50%;
		align-self: center;
		justify-self: center;

		border-radius: 10px;
		box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
			0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
			0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
			0 100px 80px rgba(0, 0, 0, 0.12);
	}
`;

export default StyledHeroSection;

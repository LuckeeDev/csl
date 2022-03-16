import { Button, Container, useMantineTheme } from '@mantine/core';
import { ChevronLeftIcon, ChevronRightIcon } from '@modulz/radix-icons';
import { Image } from '@prisma/client';
import {
	CarouselProvider,
	Slider,
	Slide,
	ButtonBack,
	ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { OmitDates } from 'types/omit';

interface CarouselProps {
	images: OmitDates<Image>[];
}

export default function Carousel({ images }: CarouselProps) {
	const theme = useMantineTheme();

	return (
		<CarouselProvider
			naturalSlideWidth={100}
			naturalSlideHeight={100}
			totalSlides={images.length}
		>
			<Slider>
				{images.map((image, index) => (
					<Slide index={index} key={index}>
						<img alt={image.name} src={image.url} style={{ width: '100%' }} />
					</Slide>
				))}
			</Slider>

			<Container
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					marginTop: theme.spacing.xs,
				}}
			>
				<Button
					component={ButtonBack}
					style={{ marginRight: theme.spacing.xs }}
				>
					<ChevronLeftIcon />
				</Button>

				<Button component={ButtonNext}>
					<ChevronRightIcon />
				</Button>
			</Container>
		</CarouselProvider>
	);
}

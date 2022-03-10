import { Button } from '@mantine/core';
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
	return (
		<CarouselProvider
			naturalSlideWidth={100}
			naturalSlideHeight={125}
			totalSlides={images.length}
		>
			<Slider>
				{images.map((image, index) => (
					<Slide index={index} key={index}>
						<img alt={image.name} src={image.url} />
					</Slide>
				))}
			</Slider>

			<Button component={ButtonBack}>Back</Button>
			<Button component={ButtonNext}>Next</Button>
		</CarouselProvider>
	);
}

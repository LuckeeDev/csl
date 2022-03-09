import { Title, Text, Anchor } from '@mantine/core';

export default function HomePage() {
	return (
		<>
			<Title
				sx={{ fontSize: 100, fontWeight: 900, letterSpacing: -2 }}
				align="center"
				mt={100}
			>
				Benvenuto su{' '}
				<Text inherit variant="gradient" component="span">
					CSL
				</Text>
			</Title>

			<Text
				color="dimmed"
				align="center"
				size="lg"
				sx={{ maxWidth: 580 }}
				mx="auto"
				mt="xl"
			>
				Il sito per la tua scuola. Gratuito,{'  '}
				<Anchor
					href="https://github.com/LuckeeDev/csl"
					size="lg"
					target="_blank"
				>
					open source
				</Anchor>
				.
			</Text>
		</>
	);
}

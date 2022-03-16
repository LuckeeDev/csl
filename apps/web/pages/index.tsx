import { Title, Text } from '@mantine/core';

export default function HomePage() {
	return (
		<>
			<Title
				sx={{ fontSize: 80, fontWeight: 900, letterSpacing: -2 }}
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
				Il sito del Comitato Studentesco Lussana.
			</Text>
		</>
	);
}

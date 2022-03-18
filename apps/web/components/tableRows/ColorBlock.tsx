import { createStyles } from '@mantine/core';

interface ColorBlockProps {
	color: string;
}

const useStyles = createStyles((theme, params: ColorBlockProps) => ({
	block: {
		borderRadius: theme.radius.sm,
		width: '40px',
		height: '25px',
		backgroundColor: params.color,
		display: 'block',
	},
}));

export default function ColorBlock(props: ColorBlockProps) {
	const { classes } = useStyles(props);

	return <span className={classes.block}></span>;
}

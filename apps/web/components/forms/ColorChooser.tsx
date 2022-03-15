import { createStyles } from '@mantine/core';

interface ColorBoxProps {
	selected: boolean;
	color: string;
}

const useStyles = createStyles((theme, params: ColorBoxProps, getRef) => ({
	btn: {
		width: '50px',
		height: '40px',
		borderRadius: '5px',
		border: 0,
		outline: 0,
		marginRight: '5px',
		cursor: 'pointer',
		backgroundColor: params.color,
		boxShadow: params.selected ? `0 0 0 2px ${theme.colors.blue[5]}` : '',
	},
}));

interface ColorButtonProps extends ColorBoxProps {
	onClick: () => void;
}

function ColorButton({ onClick, ...props }: ColorButtonProps) {
	const { classes } = useStyles(props);

	return <button className={classes.btn} onClick={onClick}></button>;
}

interface ColorChooserProps {
	colors: string[];
	value: string;
	onChange: (value: string) => void;
}

export default function ColorChooser({
	colors,
	value,
	onChange,
}: ColorChooserProps) {
	return (
		<>
			{colors.map((color, index) => (
				<ColorButton
					color={color}
					onClick={() => onChange(color)}
					selected={color === value}
					key={index}
				/>
			))}
		</>
	);
}

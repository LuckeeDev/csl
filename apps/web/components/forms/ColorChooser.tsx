import { createStyles, InputWrapper } from '@mantine/core';
import { ReactNode } from 'react';

interface ColorBoxProps {
	selected: boolean;
	color: string;
}

const useButtonStyles = createStyles((theme, params: ColorBoxProps) => ({
	btn: {
		width: '50px',
		height: '40px',
		borderRadius: theme.radius.sm,
		border: 0,
		outline: 0,
		marginRight: theme.spacing.xs,
		cursor: 'pointer',
		backgroundColor: params.color,
		boxShadow: params.selected ? `0 0 0 2px ${theme.colors.blue[5]}` : '',

		transition: '.2s all ease-in-out',
	},
}));

interface ColorButtonProps extends ColorBoxProps {
	onClick: () => void;
}

function ColorButton({ onClick, ...props }: ColorButtonProps) {
	const { classes } = useButtonStyles(props);

	return <button className={classes.btn} onClick={onClick}></button>;
}

interface ColorChooserProps {
	colors: string[];
	value: string;
	onChange: (value: string) => void;
	error?: ReactNode;
	required?: boolean;
}

export default function ColorChooser({
	colors,
	value,
	onChange,
	error,
	required,
}: ColorChooserProps) {
	return (
		<InputWrapper label="Colore" error={error} required={required}>
			<div>
				{colors.map((color, index) => (
					<ColorButton
						color={color}
						onClick={() => onChange(color)}
						selected={color === value}
						key={index}
					/>
				))}
			</div>
		</InputWrapper>
	);
}

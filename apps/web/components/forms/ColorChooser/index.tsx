import { Input } from '@mantine/core';
import { ReactNode } from 'react';
import styles from './styles.module.css';

interface ColorButtonProps {
	onClick: () => void;
	selected: boolean;
	color: string;
}

function ColorButton({ onClick, color, selected }: ColorButtonProps) {
	return (
		<button type="button" className={styles.btn} style={{backgroundColor: color, boxShadow: selected ? `0 0 0 2px var(--mantine-color-blue)` : ''}} onClick={onClick}></button>
	);
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
		<Input.Wrapper label="Colore" error={error} required={required}>
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
		</Input.Wrapper>
	);
}

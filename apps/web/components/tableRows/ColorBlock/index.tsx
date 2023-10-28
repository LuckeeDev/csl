import styles from './styles.module.css';

interface ColorBlockProps {
	color: string;
}

export default function ColorBlock({color}: ColorBlockProps) {
	return <span className={styles.block} style={{backgroundColor: color}}></span>;
}

import LinksGroup from './LinksGroup';
import { WrapperLinkProps } from './types';

interface SideLinksProps {
	links: WrapperLinkProps[];
}

export default function SideLinks({ links }: SideLinksProps) {
	return (
		<div>
			{links.map((link, i) => (
				<LinksGroup {...link} key={i} />
			))}
		</div>
	);
}

import { ShopSession } from '@prisma/client';
import ButtonLink from 'components/links/ButtonLink';

interface ShopSessionRowProps {
	shopSession: Omit<ShopSession, 'updated_at' | 'created_at'>;
}

export default function ShopSessionRow({ shopSession }: ShopSessionRowProps) {
	return (
		<tr>
			<td>{shopSession.name}</td>
			<td>{shopSession.start.toLocaleDateString('it')}</td>
			<td>{shopSession.end.toLocaleDateString('it')}</td>
			<td>
				<ButtonLink href={`/dashboard/shop/${shopSession.id}`}>
					Modifica
				</ButtonLink>
			</td>
		</tr>
	);
}

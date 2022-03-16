import { useMantineTheme } from '@mantine/core';
import { ShopSession } from '@prisma/client';
import ButtonLink from 'components/links/ButtonLink';
import { ReactNode } from 'react';
import { SessionStatus } from 'types/shopSession';
import ShopSessionStatusBadge from './ShopSessionStatusBadge';

interface ShopSessionRowProps {
	shopSession: Omit<ShopSession, 'updated_at' | 'created_at'> & {
		status?: SessionStatus;
	};
	children?: ReactNode;
}

export default function ShopSessionRow({
	shopSession,
	children,
}: ShopSessionRowProps) {
	const theme = useMantineTheme();

	return (
		<tr>
			<td>
				{shopSession.name}
				{shopSession.status && (
					<ShopSessionStatusBadge
						style={{ marginLeft: theme.spacing.xs }}
						status={shopSession.status}
					/>
				)}
			</td>
			<td>{shopSession.start.toLocaleDateString('it')}</td>
			<td>{shopSession.end.toLocaleDateString('it')}</td>
			<td>
				{children ? (
					children
				) : (
					<ButtonLink href={`/dashboard/shop/${shopSession.id}`}>
						Modifica
					</ButtonLink>
				)}
			</td>
		</tr>
	);
}

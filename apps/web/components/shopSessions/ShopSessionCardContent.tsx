import { IconClock } from '@tabler/icons-react';
import { ShopSession } from '@prisma/client';
import { SessionStatus } from 'types/shopSession';
import ShopSessionStatusBadge from './ShopSessionStatusBadge';

interface ShopSessionCardProps {
	shopSession: Omit<ShopSession, 'updated_at' | 'created_at'> & {
		status: SessionStatus;
	};
}

export default function ShopSessionCardContent({
	shopSession: s,
}: ShopSessionCardProps) {
	return (
		<>
			<div style={{ boxSizing: 'border-box', marginBottom: '10px' }}>
				<ShopSessionStatusBadge status={s.status} />
			</div>

			<h1 style={{ margin: '10px 0' }}>{s.name}</h1>

			<div style={{ display: 'flex', alignItems: 'center' }}>
				<IconClock style={{ marginRight: '10px' }} />
				{s.start.toLocaleDateString('it')} - {s.end.toLocaleDateString('it')}
			</div>
		</>
	);
}

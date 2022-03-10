import { Badge } from '@mantine/core';
import { ClockIcon } from '@modulz/radix-icons';
import { ShopSession } from '@prisma/client';
import { SessionStatus } from 'types/shopSession';

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
				{s.status === SessionStatus.PAST ? (
					<Badge variant="gradient" gradient={{ from: 'red', to: 'orange' }}>
						Terminata
					</Badge>
				) : s.status === SessionStatus.UPCOMING ? (
					<Badge
						variant="gradient"
						gradient={{ from: 'teal', to: 'blue', deg: 60 }}
					>
						In arrivo
					</Badge>
				) : (
					<Badge
						variant="gradient"
						gradient={{ from: 'teal', to: 'lime', deg: 105 }}
					>
						In corso
					</Badge>
				)}
			</div>

			<h1 style={{ margin: '10px 0' }}>{s.name}</h1>

			<div style={{ display: 'flex', alignItems: 'center' }}>
				<ClockIcon style={{ marginRight: '10px' }} />
				{s.start.toLocaleDateString('it')} - {s.end.toLocaleDateString('it')}
			</div>
		</>
	);
}

import { Badge, BadgeProps } from '@mantine/core';
import { SessionStatus } from 'types/shopSession';

interface ShopSessionStatusBadgeProps extends BadgeProps<'div'> {
	status: SessionStatus;
}

export default function ShopSessionStatusBadge({
	status,
	...props
}: ShopSessionStatusBadgeProps) {
	return status === SessionStatus.PAST ? (
		<Badge
			{...props}
			variant="gradient"
			gradient={{ from: 'red', to: 'orange' }}
		>
			Terminata
		</Badge>
	) : status === SessionStatus.UPCOMING ? (
		<Badge
			{...props}
			variant="gradient"
			gradient={{ from: 'teal', to: 'blue', deg: 60 }}
		>
			In arrivo
		</Badge>
	) : (
		<Badge
			{...props}
			variant="gradient"
			gradient={{ from: 'teal', to: 'lime', deg: 105 }}
		>
			In corso
		</Badge>
	);
}

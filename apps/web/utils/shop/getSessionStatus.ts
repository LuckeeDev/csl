import { ShopSession } from '@prisma/client';
import { OmitDates } from 'types/omit';
import { SessionStatus } from 'types/shopSession';

export default function getSessionStatus(session: OmitDates<ShopSession>) {
	const now = new Date();

	if (session.end.getTime() < now.getTime()) {
		return SessionStatus.PAST;
	} else if (session.start.getTime() > now.getTime()) {
		return SessionStatus.UPCOMING;
	} else {
		return SessionStatus.ONGOING;
	}
}

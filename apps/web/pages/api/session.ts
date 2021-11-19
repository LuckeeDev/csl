import withSession from '@/utils/session/withSession';
import { StrapiUser } from '@csl/types';

export default withSession(async (req, res) => {
	const user: StrapiUser = (req.session as any).user;

	if (user) {
		res.json({ user });
	} else {
		res.json({ user: null });
	}
});

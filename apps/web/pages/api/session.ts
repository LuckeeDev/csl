import withSession from '@/utils/withSession';

export default withSession((req, res) => {
	const user = req.session.get('user');
	const jwt = req.session.get('jwt');

	res.json({ user, jwt });
});

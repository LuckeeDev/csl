import { Card, Text } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { Group } from '@prisma/client';
import PageTitle from 'components/head/PageTitle';
import ButtonLink from 'components/links/ButtonLink';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { BasePageProps } from 'types/pages';

import styles from './styles.module.css';

interface InviteProps extends BasePageProps {
	group: Omit<Group, 'id'>;
}

export default function Invite({ group }: InviteProps) {
	return (
		<div className={styles.page}>
			<PageTitle>Invito al gruppo {group.name}</PageTitle>

			<Card shadow="sm" p="lg" className={styles.card}>
				<div className={styles.iconWrapper}>
					<IconCircleCheck height="50px" width="50px" />
				</div>

				<Text style={{fontWeight: 500}} mb="xs">
					Invito al gruppo
				</Text>

				<Text size="sm" mb="xs">
					Ti sei unito al gruppo &quot;{group.name}&quot; con successo! Puoi
					chiudere questa pagina, le modifiche sono state salvate.
				</Text>

				<ButtonLink replace href="/" variant="light" fullWidth>
					Torna alla home
				</ButtonLink>
			</Card>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<InviteProps> = async (
	ctx
) => {
	const session = await getSession(ctx);
	const userId = session?.user.id;

	const groupId = ctx.params?.id as string;

	const group = await prisma.group.findUnique({
		where: { id: groupId },
		select: { name: true },
	});

	if (!group || !session) {
		return {
			notFound: true,
		};
	}

	await prisma.user.update({
		where: { id: userId },
		data: { group: { connect: { id: groupId } } },
	});

	return {
		props: {
			session,
			group,
		},
	};
};

import ButtonLink from 'components/links/ButtonLink';
import { ExtendedGroup } from 'types/groups';

interface GroupRowProps {
	group: ExtendedGroup;
}

export default function GroupRow({ group }: GroupRowProps) {
	return (
		<tr>
			<td>{group.name}</td>
			<td>{group._count.users}</td>
			<td>{group._count.managers}</td>
			<td>
				<ButtonLink href={`/dashboard/users/group/${group.id}`}>
					Gestisci
				</ButtonLink>
			</td>
		</tr>
	);
}

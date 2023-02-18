import { ActionIcon, MultiSelect } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Role, User } from '@prisma/client';
import { IconCheck, IconPencil } from '@tabler/icons';
import { useState, useEffect, useRef } from 'react';

interface UserRowProps {
	user: User & { roles: Role[] };
	selectData: { value: string; label: string }[];
	updateRoles: (userId: User['id'], roles: string[]) => void;
}

export default function UserRow({
	user,
	selectData,
	updateRoles,
}: UserRowProps) {
	const isFirstRun = useRef(true);
	const [value, setValue] = useState(user.roles.map((r) => r.id));
	const [isEditing, toggleIsEditing] = useToggle();

	useEffect(() => {
		if (!isFirstRun.current && isEditing === false) {
			updateRoles(user.id, value);
		}

		if (isFirstRun.current) {
			isFirstRun.current = false;
		}
	}, [isEditing]);

	return (
		<tr>
			<td>{user.name}</td>
			<td>{user.email}</td>
			<td>
				{isEditing ? (
					<MultiSelect data={selectData} value={value} onChange={setValue} />
				) : (
					user.roles.map((r) => r.name).join(', ')
				)}
			</td>
			<td>
				<ActionIcon
					variant="filled"
					color="blue"
					onClick={() => toggleIsEditing()}
				>
					{isEditing ? <IconCheck /> : <IconPencil />}
				</ActionIcon>
			</td>
		</tr>
	);
}

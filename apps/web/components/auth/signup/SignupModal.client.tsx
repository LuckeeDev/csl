import { GET_GROUPS_QUERY } from '@/graphql/queries/getGroups';
import useGraphQL from '@/hooks/graphql/useGraphQL';
import { StrapiGroup } from '@csl/types';
import {
	Autocomplete,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import updateMe from '@/services/users/updateMe';

interface SignupModalProps {
	open: boolean;
	onClose: () => void;
}

interface GroupsResult {
	groups: StrapiGroup[];
}

const validationSchema = yup.object({
	name: yup.string().required('Questo campo è necessario.'),
	group: yup.string().required('Questo campo è necessario.'),
});

export default function SignupModal({ open, onClose }: SignupModalProps) {
	const { data } = useGraphQL<GroupsResult>(GET_GROUPS_QUERY);

	const formik = useFormik({
		initialValues: {
			name: '',
			group: null,
		},
		validationSchema,
		onSubmit: async (val) => {
			const data = { name: val.name, group: { id: val.group } };

			await updateMe(data);

			onClose();
		},
	});

	const groups: [string, string][] = useMemo(
		() => data?.groups.map(({ name, id }) => [id, name]) ?? [],
		[data]
	);

	const groupsMap = useMemo(() => new Map(groups), [groups]);

	useEffect(() => {
		formik.setFieldValue('group', data?.groups[0].id ?? null);
		// Adding formik would break the entire page
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<Dialog open={open} disableEscapeKeyDown>
			<form onSubmit={formik.handleSubmit}>
				<DialogTitle>Iscriviti</DialogTitle>

				<DialogContent>
					<DialogContentText>
						Mancano ancora alcuni dati per completare la tua iscrizione al sito
						della scuola. Compila i campi sottostanti per procedere.
					</DialogContentText>

					<TextField
						fullWidth
						label="Nome e cognome"
						variant="outlined"
						id="name"
						style={{ margin: '10px 0' }}
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.name && Boolean(formik.errors.name)}
						helperText={formik.touched.name && formik.errors.name}
					/>

					<Autocomplete
						noOptionsText="Nessun gruppo disponibile"
						style={{ margin: '10px 0' }}
						id="group"
						options={groups.map(([id]) => id)}
						getOptionLabel={(id) => groupsMap.get(id) ?? ''}
						disableClearable
						renderInput={(params) => (
							<TextField
								{...params}
								label="Gruppo"
								error={Boolean(formik.touched.group && formik.errors.group)}
								helperText={formik.touched.group && formik.errors.group}
							/>
						)}
						loading={data ? false : true}
						loadingText="Caricamento in corso..."
						value={formik.values.group}
						onChange={(_, val) => formik.setFieldValue('group', val)}
						onBlur={formik.handleBlur}
					/>
				</DialogContent>

				<DialogActions>
					<Button type="submit" disabled={!formik.isValid}>
						Conferma
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

import { GET_GROUPS_QUERY } from '@/graphql/queries/getGroups';
import useGraphQL from '@/hooks/graphql/useGraphQL';
import { StrapiGroup } from '@csl/types';
import {
	Autocomplete,
	AutocompleteChangeDetails,
	AutocompleteChangeReason,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';
import { SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

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
			group: '',
		},
		validationSchema,
		onSubmit: (val) => {
			console.log(val);
		},
	});

	const groups: [string, string][] = useMemo(
		() => data?.groups.map(({ name, id }) => [id, name]) ?? [],
		[data]
	);

	const groupsMap = useMemo(() => new Map(groups), [groups]);

	useEffect(() => {
		formik.setFieldValue('group', data?.groups[0].id ?? '');
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
						getOptionLabel={(id) => groupsMap.get(id)}
						renderInput={(params) => <TextField {...params} label="Gruppo" />}
						loading={data ? false : true}
						loadingText="Caricamento in corso..."
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

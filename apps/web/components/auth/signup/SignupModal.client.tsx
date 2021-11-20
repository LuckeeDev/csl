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
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
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

	function handleNameChange(val: string) {
		formik.setFieldValue('name', val);
	}

	function handleAutocompleteChange(value: string) {
		formik.setFieldValue('group', value);
	}

	useEffect(() => {
		console.log(formik.touched.name);
		console.log(formik.errors.name);
	}, [formik.touched, formik.errors]);

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
						autoFocus
						fullWidth
						label="Nome e cognome"
						variant="outlined"
						id="name"
						name="name"
						style={{ margin: '10px 0' }}
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.name && Boolean(formik.errors.name)}
						helperText={formik.touched.name && formik.errors.name}
					/>

					{/* <Autocomplete
						disablePortal
						noOptionsText="Nessun gruppo disponibile"
						style={{ margin: '10px 0' }}
						id="group-input"
						options={groups.map(([id]) => id)}
						getOptionLabel={(option) => groupsMap.get(option) ?? ''}
						renderInput={(params) => <TextField {...params} label="Gruppo" />}
						value={formik.values.group}
						onChange={(_, val) => handleAutocompleteChange(val)}
					/> */}
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

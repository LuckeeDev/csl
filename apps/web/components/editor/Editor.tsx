import { RichTextEditorProps } from '@mantine/rte';
import LoaderDiv from 'components/loader/LoaderDiv';
import dynamic from 'next/dynamic';

// dynamic is needed because Quill relies on browser APIs
const Editor = dynamic<RichTextEditorProps>(
	() => import('@mantine/rte').then((m) => m.RichTextEditor),
	{
		ssr: false,

		loading: () => <LoaderDiv />,
	}
);

export default Editor;

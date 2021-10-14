import { CircularProgress } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface DisplayPdfProps {
	file: string;
	pageNumber: number;
}

export default function DisplayPdf(props: DisplayPdfProps) {
	return (
		<Document file={props.file} loading={<CircularProgress />}>
			<Page pageNumber={props.pageNumber} />
		</Document>
	);
}

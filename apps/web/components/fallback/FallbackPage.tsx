export default function FallbackPage() {
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				height: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
			<h1>Attendi un attimo...</h1>

			<p>
				Stiamo ancora generando questa pagina. Non preoccuparti se ci vorrà un
				attimo, la prossima volta il caricamento sarà più rapido!
			</p>
		</div>
	);
}

import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html translate="no">
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600&family=Nunito+Sans:wght@400;500;600;700;800&display=swap"
						rel="stylesheet"
					/>
					<meta name="google" content="notranslate" />
					<meta
						name="google-site-verification"
						content="55qf3jTaZoFzOuhhuosrtNOM695blHMllvnMXMAf4p8"
					/>
					{process.env.NODE_ENV === "production" && (
						<script
							dangerouslySetInnerHTML={{
								__html: `(function(h,o,t,j,a,r){
													h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
													h._hjSettings={hjid:2446941,hjsv:6};
													a=o.getElementsByTagName('head')[0];
													r=o.createElement('script');r.async=1;
													r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
													a.appendChild(r);
												})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
							}}
						/>
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

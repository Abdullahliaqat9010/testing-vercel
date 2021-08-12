import Document, { Html, Head, Main, NextScript,DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx:DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html translate="no" >
        <Head>
						<link
							href="https://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"
							rel="stylesheet"
						/>
						<link
							href="https://cdn.osmbuildings.org/4.1.1/OSMBuildings.css"
							rel="stylesheet"
						/>
						<link rel="preconnect" href="https://fonts.googleapis.com" />
						<link rel="preconnect" href="https://fonts.gstatic.com" />
						<link
							href="https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600&family=Nunito+Sans:wght@400;700;800&display=swap"
							rel="stylesheet"
						/>
						<script src="https://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js" />
						<script src="https://cdn.osmbuildings.org/classic/0.2.2b/OSMBuildings-Leaflet.js" />
						<script src="https://cdn.osmbuildings.org/4.1.1/OSMBuildings.js" />
            <meta name="google" content="notranslate" />
					</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

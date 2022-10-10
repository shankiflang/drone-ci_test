import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import UserProvider from 'components/providers/UserProvider';
import MiddlewareProvider from 'components/providers/MiddlewareProvider';
import { useApollo } from 'lib/apollo/withApollo';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'next-themes'
import ModalProvider from 'components/providers/ModalProvider';
import { DefaultSeo } from 'next-seo';
import { ToastContainer } from 'react-toastify';



export const defaultSEO = {
	openGraph: {
		type: 'website',
		locale: 'fr_FR',
		url: 'https://localhost/',
		site_name: 'Boilerplate',
	}
}



function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const apolloClientSystem = useApollo(pageProps)

	return (
		<>
			<ToastContainer
				position="bottom-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<ThemeProvider attribute='class'>
				<SessionProvider session={session}>
					<ApolloProvider client={apolloClientSystem}>
						<UserProvider>
							<MiddlewareProvider>
								<ModalProvider>
									<DefaultSeo {...defaultSEO} />
									<Component {...pageProps} />
								</ModalProvider>
							</MiddlewareProvider>
						</UserProvider>
					</ApolloProvider>
				</SessionProvider>
			</ThemeProvider>
		</>
	)
}

export default MyApp

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from "./containers/App";
import {BrowserRouter} from "react-router-dom";

import {Provider} from "react-redux";

import './index.scss';
import reportWebVitals from './reportWebVitals';
import configureStore from "./redux/configureStore";

import {createTheme, ThemeProvider} from "@mui/material";
import {QueryClient} from "@tanstack/react-query";
import {QueryClientProvider} from "@tanstack/react-query";

const store = configureStore();
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
	palette: {
		secondary: {
			main: "#f8e900"
		},
		success: {
			main: '#11a901',
		},
	},
});


root.render(
	<Provider store={store}>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<App/>
				</QueryClientProvider>
			</ThemeProvider>
		</BrowserRouter>
	</Provider>
);

/*
* If you want to start measuring performance in your app, pass a function
* to log results (for example: reportWebVitals(console.log))
* or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
*/
reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { msalInstance } from './auth-config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// ReactDOM.render(
// 	<Provider store={store}>
// 	  <ChakraProvider theme={theme}>
// 		<React.StrictMode>
// 		  <ThemeEditorProvider>
// 			<Router>
// 			  <App instance={msalInstance} />
// 			</Router>
// 		  </ThemeEditorProvider>
// 		</React.StrictMode>
// 	  </ChakraProvider>
// 	</Provider>,
// 	document.getElementById("root")
//   );

root.render(
  <React.StrictMode>
   <App instance={msalInstance} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

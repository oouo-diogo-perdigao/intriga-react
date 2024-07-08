import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/styles.scss";

import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getGoogleKey } from "./config/AuthKeys";
import { RoutesStructure } from "./components/RoutesStructure";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "./components/assets/Theme";

const storePersist = store();

const clientId = getGoogleKey();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={storePersist.store}>
		<PersistGate loading={null} persistor={storePersist.persistor}>
			<Theme>
				{/* rotas */}
				<BrowserRouter>
					<GoogleOAuthProvider clientId={clientId}>
						<RoutesStructure />
					</GoogleOAuthProvider>
				</BrowserRouter>
			</Theme>
		</PersistGate>
	</Provider>
);

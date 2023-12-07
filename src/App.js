import React from "react";
import "./App.css";
import LogoBar from "./components/LogoBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";

function App() {
	return (
		<div className="App">
			<React.Suspense fallback={<div>Loading...</div>}>
				<Router>
					<LogoBar />
					<Routes>
						<Route
							path="/"
							element={<Dashboard />}
						/>
					</Routes>
				</Router>
			</React.Suspense>
		</div>
	);
}

export default App;

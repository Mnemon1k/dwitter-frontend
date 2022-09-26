import {Routes, Route, Navigate} from "react-router-dom"
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import Header from "../components/Header/Header";
import SignupPage from "../pages/Signup/SignupPage";
import UserPage from "../pages/User/UserPage";
import Page404 from "../pages/Page404/Page404";

function App() {
	return (
		<div className={"page"}>
			<Header/>
			<Routes>
				<Route path="/" element={<HomePage/>}/>
				<Route path="/user" element={<UserPage/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/signup" element={<SignupPage/>}/>
				<Route path="/404" element={<Page404/>}/>
				<Route
					path="*"
					element={<Navigate to={"/404"} replace/>}
				/>
			</Routes>
		</div>
	);
}

export default App;

import {Routes, Route} from "react-router-dom"
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import Menu from "../Menu/Menu";
import SignupPage from "../pages/Signup/SignupPage";
import UserPage from "../pages/User/UserPage";

function App() {
	return (
		<div className={"page"}>
			<Menu/>
			<Routes>
				<Route path="/" element={<HomePage/>}/>
				<Route path="/user" element={<UserPage/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/signup" element={<SignupPage/>}/>
			</Routes>
		</div>
	);
}

export default App;

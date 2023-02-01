import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import LandingLayout from "./layouts/Landing";
import MainLayout from "./layouts/Main";
import TaskLayout from "./layouts/Task";
import AdminLayout from "./layouts/Admin";


import MyTasks from "./componenets/MyTasks"
import LandingWIzard from "./componenets/LandingPage";
import LandingDesigner from "./componenets/SignUpDesigner"
import ConsentForm from "./componenets/ConsentForm";
import SignIn from './componenets/Signin'
import SignInToken from './componenets/Signin/Token'


import AdminTasks from './componenets/Admin/Tasks.jsx'
import AdminBlocks from './componenets/Admin/Blocks.jsx'
import AdminTaskList from './componenets/Admin/TaskList.jsx'

import theme from "./theme"
import './App.css';


function NoMatch() {
	return (
		<div>
			<h2>Nothing to see here!</h2>
			<p>
				<Link to="/">Go to the home page</Link>
			</p>
		</div>
	);
}

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="/welcome" element={<LandingLayout />}>
					<Route index element={<LandingWIzard />} />
					<Route path="designer" element={<LandingDesigner />} />
				</Route>
				<Route path="/" element={<MainLayout />}>
					<Route path="*" element={<NoMatch />} />
					<Route index element={<MyTasks />} />

					<Route path="consent" element={<ConsentForm />} />
					<Route path="sign/token" element={<SignInToken />} />
					<Route path="sign/in" element={<SignIn />} />
				</Route>
				<Route path="/task/:taskId" element={<TaskLayout />} />

				<Route path="/admin" element={<AdminLayout />}>
					<Route path="block/:TaskBlockId" element={<AdminTasks />} />
					<Route path="tasks/" element={<AdminTaskList />} />

					<Route index element={<AdminBlocks />} />
				</Route>
				<Route path="*" element={<NoMatch />} />
			</Routes>
			

		</ThemeProvider>
	);
}


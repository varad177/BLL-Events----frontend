import { createContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./components/User/Login";
import Home from "./components/home/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./components/User/AddUser";
// import Navbar from "./components/Navbar/Navbar";
import AssignTask from "./components/User/AssignTask";
import TaskAssignForm from "./components/User/TaskAssignForm";
import SendPassForm from "./components/pass/SendPassForm";
import CreateEvents from "./components/Events/CreateEvents";
import Editor from "./components/Events/Editor";
import ViewPass from "./components/pass/ViewPass";
import ViewUserPass from "./components/pass/ViewUserPass";
import ViesAttendees from "./components/pass/ViesAttendees";
import EditPass from "./components/pass/EditPass";
import EditUser from "./components/User/EditUser";
import ViewEvents from "./components/Events/ViewEvents";
import ViewEventPass from "./components/Events/ViewEventPass";
import DeleteUser from "./components/User/DeleteUser";
import EditEvents from "./components/Events/EditEvents";
import DeleteEvents from "./components/Events/DeleteEvents";
import ResetPassWord from "./components/User/ResetPassWord";

export const UserContext = createContext({});

function App() {
  const [userAuth, setUserAuth] = useState();

  useEffect(() => {
    handling_session();
  }, []);

  const handling_session = () => {
    const userInSession = sessionStorage.getItem("user");
    if (userInSession) {
      setUserAuth(JSON.parse(userInSession));
    } else {
      setUserAuth({ token: null });
    }
  };

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* <Route path="/" element={<Navbar />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/add-user/:userId" element={<AddUser />} />
          <Route path="/assign-task" element={<AssignTask />} />
          <Route path="/assign/:id" element={<TaskAssignForm />} />
          <Route path="/send-pass/:userId" element={<SendPassForm />} />
          <Route path="/send-pass" element={<SendPassForm />} />
          <Route path="/create-event" element={<Editor />} />
          <Route path="/create-event/:passId" element={<Editor />} />
          <Route path="/view-all-pass" element={<ViewPass />} />
          <Route path="/view-user-pass/:userId" element={<ViewUserPass />} />
          <Route path="/attendees" element={<ViesAttendees />} />
          <Route path="/edit-pass" element={<EditPass />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/view-events" element={<ViewEvents />} />
          <Route path="/view-event-pass/:passId" element={<ViewEventPass />} />
          <Route path="/delete-user" element={<DeleteUser />} />
          <Route path="/edit-event" element={<EditEvents />} />
          <Route path="/delete-event" element={<DeleteEvents />} />
          <Route path="/reset-password" element={<ResetPassWord />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

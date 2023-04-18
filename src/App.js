import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from './users/AddUser';
import UpdateUser from './users/UpdateUser';
import ViewUser from './users/ViewUser';
import LoginForm from './pages/LoginForm';
import LoanApplication from './users/LoanApplication';
import ViewApplications from './users/viewApplications';
import AdminView from './users/AdminView';
import AdminUserDetails from './users/AdminUserDetails';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LoginForm/>}/>
          <Route exact path="/loanapplication/:userId" element={<LoanApplication/>}/>
          <Route exact path="/viewloanapplication/:applicationId" element={<ViewApplications/>}/>
          <Route exact path="/viewuser/:id" element={<ViewUser/>}/>
          <Route exact path="/adminView/:id" element={<AdminView/>}/>
          <Route exact path="/adminUserDetails/:id" element={<AdminUserDetails/>}/>
          <Route exact path="/adduser" element={<AddUser/>}/>
          <Route exact path="/updateuser/:id" element={<UpdateUser/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./component/services/ContextAuth";
import Upload from "./component/Upload";
import Navbar from "./component/Navbar";
import UserProfile from "./component/UserProfile";
import Join from "./component/Join";
import Home from "./component/Home";
import Register from "./component/Register";
import AI_generatation from "./component/AI_generation";
import ProtectAuth from "./component/services/ProtectAuth";
import Search from "./component/Search";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route element={<ProtectAuth />}>
            <Route path="/Upload" element={<Upload />}></Route>
            <Route
              path="/AI_generatation"
              element={<AI_generatation />}
            ></Route>
          </Route>
          <Route path="/user/:id" element={<UserProfile />}></Route>
          <Route path="/login" element={<Join />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/photo/:q" element={<Search />}></Route>
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;

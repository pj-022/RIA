import Home from "./Pages/Home/Home";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer"
import NotFound from "./components/NotFound/NotFound";
import AuthPage from "./Pages/Authpage/AuthPage";
import Sidebar from "./components/Sidebar/Sidebar";
import Blog from "./Pages/AddBlog/AddBlog";
import ViewBlog from "./Pages/ViewBlog/ViewBlog";
import Settings from "./Pages/Settings/Settings";
import React from "react";

//TODO: Adjust Footer so that It sticks to bottom but not overlay
//TODO: Adding Time for Reading per Blogg
//TODO: Adjusting Image Upload Drop Effect
//TODO: Optimize (add Array{}) the code of ViewBlog Page
//TODO: Error Handling on AddBlogg Page
//TODO: Fix Header Profile button with User-Name
//TODO: Fix the Save Changes on ViewBlog that runs the First Time without any Changes
//TODO: Improve Error and Input Handling of Authpage Signup Form 1
//TODO: Adding a spinner for Loading Time to Pages
//TODO: Implementing Tags Input and Searches For Bloggs
//TODO: Converting into JSX files
//TODO: Adding Axios for Api calls everywhere in backend


const baseUrl = "https://ria-server.herokuapp.com/"

const App = () => {
  return (
    <Router>
      <Header baseUrl={baseUrl} />
      <Sidebar baseUrl={baseUrl} />
      <Switch>
        <Route exact path="/">
          <AuthPage baseUrl={baseUrl} />
        </Route>
        <Route exact path="/home">
          <Home baseUrl={baseUrl} />
        </Route>
        <Route exact path="/addblog">
          <Blog baseUrl={baseUrl} />
        </Route>
        <Route path="/viewblog/:id">
          <ViewBlog baseUrl={baseUrl} />
        </Route>
        <Route exact path="/settings">
          <Settings baseUrl={baseUrl} />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

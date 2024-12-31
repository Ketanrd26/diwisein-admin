import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Dashboard from "./dashboard/Dashboard";
import Sidebar from "./sidebar/Sidebar";
import ContextProvider from "./Context";
import ContactList from "./contactlist/ContactList";
import Blog from "./blog_list/Blog";
import Addblog from "./blog_list/Addblog";
import Login from "./login/Login";
import { useEffect, useState } from "react";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username"));
    };

    
    window.addEventListener("storage", handleStorageChange);

   
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username"); 
    setUsername(null); 
  }
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          {username && <Sidebar handleLogout={handleLogout} />}

          <Routes>
            {username ? (
              <>
                {" "}
                <Route path="/" element={<Dashboard />} />
                <Route path="/contactlist" element={<ContactList />} />
                <Route path="/bloglist" element={<Blog />} />
                <Route path="/addBlog" element={<Addblog />} />
              </>
            ) : (
              <Route path="*" element={<Login setUsername={setUsername} />} />
            )}
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;

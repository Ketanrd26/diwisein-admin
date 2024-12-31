import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const contextData = createContext();

const ContextProvider = ({ children }) => {
  const [contactData, setContactData] = useState([]);
  const [blogsData, setBlogsData] = useState([]);

  const contactDataHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT_BACKEND}contact/getAllContact`
      );

      setContactData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const blogsDataHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT_BACKEND}blog/getAllBlog`
      );

      setBlogsData(response.data.response);
    } catch (error) {}
  };

  useEffect(() => {
    contactDataHandler();
    blogsDataHandler();
  }, []);

  return (
    <contextData.Provider value={{ contactData, blogsData,setBlogsData }}>
      {children}
    </contextData.Provider>
  );
};

export default ContextProvider;

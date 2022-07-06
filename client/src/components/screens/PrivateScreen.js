import { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = 'https://fast-eyrie-81170.herokuapp.com/';


const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const history = useHistory();

  useEffect(() => {
    if(!localStorage.getItem("authToken")){
      history.push("/login");
    }
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, [history]);

  const logoutHandler = ()=>{
    localStorage.removeItem("authToken");
    history.push("/login");
  }

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
    <div style={{background: "green", color: "white"}}> {privateData} </div>
    <button onClick={logoutHandler}> Logout </button>
    </>
  );
};

export default PrivateScreen;

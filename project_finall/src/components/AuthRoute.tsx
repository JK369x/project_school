import React from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

export interface IAuthRouterProps {}

const AuthRoute: React.FunctionComponent<IAuthRouterProps> = (props) => {
//   const { children } = props;
  const auth = getAuth()
  const navigate = useNavigate
  const [loading, setLoading] = useState(false);


  return <>
    {/* {children} */}
  </>;
};

export default AuthRoute;

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

export default  function PrivateRoute( {children} ) {
    const { isAuth } = useSelector(state => state.login);
    const toast = useToast();

    if(!isAuth){
        toast({
            title: "You are not logged in",
            description: "Please login to access Dashboard",
            status: "error",
            duration: 2000,
            isClosable: true,
        });
    }

    return isAuth ?  children : <Navigate to={"/login"}/>
	
}


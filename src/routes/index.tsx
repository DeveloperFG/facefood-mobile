import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";

import AppRoutes from "./auth.routes";
import AuthRoutes from "./app.routes";


function Routes(){
    const { isAuthenticated, loading } = useContext(AuthContext)

    if(loading){
        return(
            <View 
            style={{flex:1, 
                backgroundColor:'#1d1d2e', 
                justifyContent:'center',
                 alignItems:'center'}}>
                <ActivityIndicator size={60} color='#fff'/>
            </View>
        )
    }

    return(

        isAuthenticated ? <AppRoutes/> : <AuthRoutes/>

    )
}

export default Routes;
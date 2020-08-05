import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";

function AdminRoute({ component: Component, ...rest }) {
    const { authTokens,authRole } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                authTokens && authRole === 'admin'  ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{ pathname: "/", state: { referer: props.location } }}
                        />
                    )
                
            }
        />
    );
}

export default AdminRoute;

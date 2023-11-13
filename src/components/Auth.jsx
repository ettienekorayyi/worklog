import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { listenAuthState } from '../actions/action';
import { getIsSignedIn } from '../selector/userSelector';

const Auth = ({ children, matches }, history) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);
    
    useEffect(() => {
        if (!isSignedIn) dispatch(listenAuthState(matches))
    }, [matches]);

    // Adds the custom history object in the children.
    const childrenWithProps = React.Children.map(children, child => {
        return React.isValidElement(child) 
            ? React.cloneElement(child, {history}) : child;
    });

    if (!isSignedIn) return <></>
    else return childrenWithProps 

}
export default Auth;
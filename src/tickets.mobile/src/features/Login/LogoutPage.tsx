import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useHistory, Redirect} from "react-router-dom";
import {setLoggedOut} from "./LoginSlice";
import {none, some} from "fp-ts/Option";

export const LogoutPage: React.FC = (b) => {
    const isLoggedIn = useAppSelector(x => x.loginSlice.isLoggedIn)
    const history = useHistory() // typing from https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react
    const dispatch = useAppDispatch();
    dispatch(setLoggedOut(none))
    return  <Redirect to={'/page/Login'}/>
};
import { LOAD_USER, REGISTER_USER, FAIL_USER, LOGIN_USER , LOGOUT_USER ,CURRENT_USER ,EDIT_USER} from "../const/const";
import axios from "axios";




//registerrr
export const registeruser = (user,history) => async (dispatch) => {
dispatch({ type:LOAD_USER});
    try {
       let result= await axios.post("/user/register",user)
        dispatch({type:REGISTER_USER,payload:result.data})
        history.push("/Dashboard")
    } catch (error) {

        const { errors, msg } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    if (msg) {
      alert(msg);
    }
  }
};



//loginn
export const loginuser = (user,history) => async (dispatch) => {
    dispatch({ type:LOAD_USER});
        try {
           let result= await axios.post("/user/login",user)
            dispatch({type:LOGIN_USER,payload:result.data})
            history.push("/Dashboard")
        } catch (error) {
    
            const { errors, msg } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    if (msg) {
      alert(msg);
    }
  }
};



    export const current = () => async (dispatch) => {
        dispatch({ type: LOAD_USER });
        const options = {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        };
        try {
          let result = await axios.get("/user/current", options);
          //  user
          dispatch({ type: CURRENT_USER, payload: result.data.user });
        } catch (error) {
          dispatch({ type: FAIL_USER, payload: error.response.data });
        }
      };
      

      export const logout = () => {
        return {
          type: LOGOUT_USER,
        };
      };
      //update user
      export const editUser = (id, user) => async(dispatch) => {
        await axios
       .put(`/user/${id}`, user)
          .then((res) => {
           dispatch({ type: EDIT_USER, payload: res.data.message });
           })
          .then(dispatch(current()))
          .catch((err) => {console.log(err);
         });
     };
      
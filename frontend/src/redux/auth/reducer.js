// 액션 타입 참조
import { USER_LOGIN } from "../../constants/actionTypes";
import { UPDATE_PROFILE_IMG } from "../../constants/actionTypes";
import { USER_ID } from "../../constants/actionTypes";

const INIT_STATE = {
  token: "",
  profile_img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  userId: 0,
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        token: action.payload.token,
      };
    case UPDATE_PROFILE_IMG:
      return {
        ...state,
        profile_img: action.payload.profile_img,
      };
    case USER_ID: {
      return {
        ...state,
        userId: action.payload.userId,
      };
    }
    default:
      return state;
  }
};

export default Auth;

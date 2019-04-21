import { SET_CURRENT_USER } from "../actions/types";
import Validator from "validate.js";

const initialState = {
    isAuthenticated: false,
    user: {
        id: "",
        name: "",
        avatar: "",
        iat: "",
        exp: ""
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !Validator.isEmpty(action.payload),
                user: {
                    id: action.payload.id,
                    sub: action.payload.sub,
                    name: action.payload.name,
                    avatar: action.payload.avatar,
                    iat: action.payload.iat,
                    exp: action.payload.exp
                }
            };
        default:
            return state;
    }
}
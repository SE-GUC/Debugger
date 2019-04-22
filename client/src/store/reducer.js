const initialState = {
  userId: null,
  VGSUserId: null,
  userType: null,
  appStatus:null
};

const reducer = (state = initialState, action) => {

    if(action.type ==="ADDCRED"){
        return {
            ...state,
            userId:action.urId,
            VGSUserId:action.vgsId,
            userType:action.vgsType,
            appStatus:action.appStatus
        }
    }
    if(action.type ==="LOGOUT"){
      return initialState;
    }
    if(action.type === "SUBMITAPP"){
      return{
        ...state,
        VGSUserId:action.updatedVgsId,
        appStatus:action.updatedStatus
      }
    }
  return state;
};

export default reducer;

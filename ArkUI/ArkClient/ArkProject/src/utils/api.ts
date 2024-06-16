import { api } from "./axiosIntercept";


export const ValidateUser = async () => {
  const res = await api.get(`Auth/ValidateUser`);
  if (res === undefined) {
    return null;
  }
  else if(res?.status === 200){
    return true;
  }
  else {
    return false;
  }
};
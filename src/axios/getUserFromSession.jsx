import api from "./axios";



const getUser = async () => {
  
  const UserInSession = sessionStorage.getItem("user");
  if (UserInSession) {
    const _id = JSON.parse(UserInSession)._id;
    const token = JSON.parse(UserInSession).token;
  


  try {
    const res = await api.post("/get-user", { _id });


    return {
      token: token,
      email: res.data.email,
      fullname: res.data.fullname,
      role: res.data.role,
      mobno: res.data.mobno,
      _id: res.data._id,
      tasks: res.data.tasks,
    };
  } catch (error) {
    console.error(error);
  }
}
else{
return false

}
};
export default getUser;

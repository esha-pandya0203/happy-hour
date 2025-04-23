import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const FOLLOWS_API = `${REMOTE_SERVER}/api/follows`;

export const findAllFollows = async () => {
  const response = await axiosWithCredentials.get(FOLLOWS_API);
  return response.data;
};

export const followUser = async (follower_id: string, followee_id: string) => {
    const newFollow = { follower_id: follower_id, followee_id: followee_id }; 
    const response = await axiosWithCredentials.post(`${FOLLOWS_API}`, newFollow); 
    return response.data; 
}

export const unfollowUser = async (follower_id: string, followee_id: string) => {
    const unfollowData = { follower_id: follower_id, followee_id: followee_id }; 
    const response = await axiosWithCredentials.delete(`${FOLLOWS_API}`, {data: unfollowData}); 
    return response.data; 
}

export const getFollowers = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${FOLLOWS_API}/followers/${userId}`); 
    return response.data; 
}

export const getFollowees = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${FOLLOWS_API}/followees/${userId}`); 
    return response.data; 
}

export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${FOLLOWS_API}?role=${role}`);
  return response.data;
};

export const findUserById = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${FOLLOWS_API}/${userId}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${FOLLOWS_API}/${userId}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(`${FOLLOWS_API}`, user);
  return response.data;
};

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${FOLLOWS_API}/signin`,
    credentials
  );
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${FOLLOWS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `${FOLLOWS_API}/${user._id}`,
    user
  );
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${FOLLOWS_API}/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${FOLLOWS_API}/signout`);
  return response.data;
};
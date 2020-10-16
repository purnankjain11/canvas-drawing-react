import Axios from "axios";
import { URL } from "../constants";

const getFiles = async () => {
  return await Axios.get(URL.GET_FILES);
};

const getFileByName = async (name) => {
  return await Axios.get(URL.GET_FILE_BY_NAME(name));
};

const saveFile = async (name, data) => {
  await Axios.post(URL.SAVE_FILE, { name, data });
};

const FILE_SERVICE = {
  getFiles,
  getFileByName,
  saveFile,
};

export default FILE_SERVICE;

import api from "./api";
import handleRequestError from "../hooks/handleRequestError";
import FormatName from "../hooks/upLoadName";

const URL = '/complains';

const userParams = {
    accepted: true
}  

const submitObj = (param) => ({
    animal: param.animal.trim(),
    walking: param.andando,
    description: param.ocorrido.trim(),
    hour: param.horario,
    adress: param.endereco.trim(),
    city: param.cidade.trim(),
});
  
export const createComplain = async (obj, token) => {
    const upLoadName = FormatName(obj, 'complains');
    const data = submitObj(obj)

    const formData = new FormData();

    formData.append('data', JSON.stringify(data));
    formData.append('file', {
        uri: obj.picture[0],
        type: 'image/jpeg',
        name: upLoadName, 
    });

    try {
        const request = await api.post(URL, formData, {
            headers: {
                'Authorization': token,
                'Content-Type': 'multipart/form-data',
            }
        });

    return request;
    } catch (error) {
        const errorResponse = handleRequestError(error);
    return errorResponse;
    }
};

export const visibleComplains = async (token) => {
    const queryString = Object.keys(userParams)
    .map(key => `${key}=${userParams[key]}`)
    .join('&');

    try {
        const { data } = await api.get(
            `${URL}?${queryString}`,
          {
            headers: { 'Authorization': token }
          }
        );
        return data
      } catch (error) {
        const errorResponse = handleRequestError(error)
        console.error(...errorResponse);
    }
}

export const archiveComplain = async (id, token) => {
    const obj = {
      new: false
    };
  
    try {
      const { data } = await api.put(
        `${URL}/${id}`, obj,
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        }
      );
      return data;
    } catch (error) {
      const errorResponse = handleRequestError(error);
      console.error(...errorResponse);
    }
};

export const returnComplain = async (id, token) => {
  const obj = {
    new: true
  };

  try {
    const { data } = await api.put(
      `${URL}/${id}`, obj,
      {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );
    return data;
  } catch (error) {
    const errorResponse = handleRequestError(error);
    console.error(...errorResponse);
  }
};

  export default {
    delete: archiveComplain,
    update: returnComplain
  }
import axios from "axios";
import { Constants } from "./constants";
const postRequest = async (url: string, data?: any) => {
  console.log(url, data);

  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(async (response) => {
        if (response && (response.status === 200 || response.status === 201)) {
          return resolve(response?.data);
        }
        console.log("====================================");
        console.log(response?.data?.message, "error");
        console.log("====================================");
        return reject(
          new Error(response?.data?.message || Constants.others.wentWrong)
        );
      })
      .catch(async (error) => {
        reject(error);
      });
  });
};

const getQuoteList = async (url: string, data?: any) => {
  console.log(url, data);

  try {
    const response = await axios.get(url, {
      headers: {
        userId: data.userId,
      },
    });
    console.log("response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    console.error("Error fetching data:", error);
    return error;
  }
};
const quoteSearchRequest = async (url: string, data?: any) => {
  let quoteUrl = `${url}${data.quote}`;
  const headers = {
    "X-Api-Key": Constants.apiKey.quoteSearchKey,
    contentType: "application/json",
  };

  try {
    const response = await axios.get(quoteUrl, {
      params: data, // Include body data as URL parameters
      headers: headers, // Include custom headers
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
};

export { postRequest, getQuoteList, quoteSearchRequest };

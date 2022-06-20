const axios = require("../../node_modules/axios");

const detectLanguage = async (requestBody, authToken) => {
  // make request body

  let config = {
    method: "post",
    url: "https://api.tisane.ai/detectLanguage",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": `${authToken}`,
    },
    data: requestBody,
  };

  return new Promise(async (resolve, reject) => {
    try {
      // make api call using axios to detect language
      const response = await axios(config);
      let language = response.data.languages[0].language;
      resolve(language);
    } catch (error) {
      reject(error);
    }
  });
};

// Testing module output

// const getValue = async () => {
//   try {
//     const response = await detectLanguage(
//       { content: "he is good" },
//       "e0ebf24d8f484c718fbb4c2d814e113"
//     );
//     console.log(response);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// getValue();

module.exports = {
  detectLanguage,
};

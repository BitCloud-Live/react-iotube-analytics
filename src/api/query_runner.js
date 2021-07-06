import axois from "axios";
export function runInfluxQuery(query) {
  const url = "http://127.0.0.1:9090/api/v1/query";
  return new Promise((resolve) => {
    axois
      .post(url, query, {
        headers: {},
      })
      .then(function (response) {
        resolve(response.data.data.result);
      })
      .catch(function (error) {
        console.log(error);
        resolve(error);
      });
  });
}

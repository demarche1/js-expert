const https = require("https");

class Service {
  makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        try {
          response.on("data", (data) => {
            resolve(JSON.parse(data));
          });
        } catch (error) {
          response.on("error", () => {
            reject(error);
          });
        }
      });
    });
  }

  async getCharacterInfo(url) {
    const { name, birth_year, films } = await this.makeRequest(url);

    return {
      name,
      birthYear: birth_year,
      appearedIn: films.length,
    };
  }
}

module.exports = Service;

const API_KEY = "YAF8W62YVFMSESZXNB8JBK8Q6";
export default class Model {
  generateURL(city) {
    const API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},UK?key=${API_KEY}`;
    return API_URL;
  }
  async getWeather(city, dateFrom, dateTo, render) {
    try {
      const response = await fetch(this.generateURL(city));
      console.log(response.status);
      const data = await response.json();
      console.log(data);
      render(data);
    } catch (err) {
      alert(err);
      throw err;
    }
  }
}

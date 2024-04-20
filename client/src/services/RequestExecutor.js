const INIT = {
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

class RequestExecutor {
  constructor() {
    this.baseUrl = "";
  }

  get(url, code) {
    return this.execute(code ? url + "/" + code : url, false, {
      ...INIT,
      method: "GET",
    });
  }
  post(url, data) {
    return this.execute(url, false, { ...INIT, method: "POST" }, data);
  }

  put(url, code, data) {
    return this.execute(
      url + "/" + code,
      false,
      { ...INIT, method: "PUT" },
      data
    );
  }

  delete(url, code) {
    return this.execute(url + "/" + code, false, { ...INIT, method: "DELETE" });
  }

  async execute(url, exact, init, data) {
    try {
      if (data) init = { ...init, body: JSON.stringify(data) };

      const location = exact ? url : this.baseUrl + url;
      const response = await fetch(location, init);

      if (!response.ok) throw new Error("Network error!");

      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default new RequestExecutor();

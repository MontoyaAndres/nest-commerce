const axios = require("axios");

(async () => {
  try {
    const {
      data: { token },
    } = await axios.post("http://localhost:3000/auth/login", {
      username: "seller",
      password: "password",
    });

    const { data: res2 } = await axios.get("http://localhost:3000/auth", {
      headers: { authorization: `Bearer ${token}` },
    });

    console.log(res2);
  } catch (err) {
    console.log(err);
  }
})();

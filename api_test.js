const axios = require("axios");

(async () => {
  try {
    const { data } = await axios.post("http://localhost:3000/auth/login", {
      username: "kelvin",
      password: "password",
    });

    console.log(data);
  } catch (err) {
    console.log(err);
  }
})();

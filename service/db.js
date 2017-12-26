const loki = require("lokijs");

const db = new loki("tokenStore");
const tokenStore = db.addCollection("refreshTokenStore", {
  indices: ["id"]
});

const saveToken = token => {
  tokenStore.insert({
    id: 1,
    token: token,
    blackListed: false
  });
};

const tokenExists = token => {
  const result = tokenStore.where(
    obj => obj.token === token && obj.blackListed === false
  );
  console.log(result === [] ? false : result.length > 0);
  return result === [] ? false : result.length > 0;
};

module.exports = {
  saveToken,
  tokenExists
};

// object with constant fields som represent (token request) from keycloak
const constant = Object.freeze({
  url: "http://localhost:8080/realms/TWRentalRealm/protocol/openid-connect/token",
  scope: "openid",
  granttype: "password",
  clienid: "rentalClient", // all these fields from keycloak
});

// function for request a token
export const getToken = async (username, password) => {
  console.table(username, password);
  const output = {
    success: false,
  };
  await fetch(constant.url, {
    method: "POST",
    header: {
      accept: "*/*",
      "Constant-type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Acces-Control-Allow-Origin": "*",
      "Acces-Control-Allow-Headers": "*",
    },
    body: new URLSearchParams({
      client_id: constant.clienid,
      grant_type: constant.granttype,
      scope: constant.scope,
      username: username,
      password: password,
    }),
  })
    .then(async (response) => {
      if (response.status === 200) {
        const parsed = await response.json()
        localStorage.setItem("anasToken", parsed.access_token);
        localStorage.setItem("anasRefreshToken", parsed.refresh_token);
        localStorage.setItem("userName", username);
        output.success = true;
      } else {
        console.error("bad user name or password", response.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return output;
};

export const checkExp = async()=>{
  console.log('checking token exp');
  const access_token = localStorage.getItem('anasToken')
  const refresh_token = localStorage.getItem('anasRefreshToken')
  const userName = localStorage.getItem('userName')
  if(!access_token || !refresh_token || !userName) return false

  const now = new Date()
  const decodedAccessToken = JSON.parse(atob(access_token.split('.')[1]))
  const date = new Date(decodedAccessToken.exp * 1000)
  if(now >= date){
    await renewToken()
    return true
  }else return false
}

const renewToken = async () => {
console.log('renewing the token');
  await fetch(constant.url, {
    method: "POST",
    header: {
      accept: "*/*",
      "Constant-type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Acces-Control-Allow-Origin": "*",
      "Acces-Control-Allow-Headers": "*",
    },
    body: new URLSearchParams({
      client_id: constant.clienid,
      grant_type: 'refresh_token',
      scope: constant.scope,
      refresh_token: localStorage.getItem('anasRefreshToken'),
    }),
  })
    .then(async (response) => {
      if (response.status === 200) {
        const parsed = await response.json()
        localStorage.setItem("anasToken", parsed.access_token);
        localStorage.setItem("anasRefreshToken", parsed.refresh_token);
      }
    })
};
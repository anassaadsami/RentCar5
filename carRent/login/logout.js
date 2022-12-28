const constant = Object.freeze({
    url: "http://localhost:8080/realms/TWRentalRealm/protocol/openid-connect/logout",
    scope: "openid",
    granttype: "refresh_token",
    clienid: "rentalClient", // all these fields from keycloak
  });

export const clearSession = async () => {
    
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
        refresh_token: localStorage.getItem('anasRefreshToken'),
      }),
    })
      .then(async (response) => {
        console.log(response);
        if(response.status === 204){
            localStorage.removeItem('anasToken')
            localStorage.removeItem('anasRefreshToken')
            localStorage.removeItem('userName')
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return output;
  };
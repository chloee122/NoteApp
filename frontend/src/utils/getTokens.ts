interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const getTokens = (): Tokens => {
  const tokens: Tokens = {
    accessToken: "",
    refreshToken: "",
  };
  const tokensJSON = localStorage.getItem("tokens");
  if (tokensJSON) {
    const { accessToken, refreshToken } = JSON.parse(tokensJSON) as Tokens;
    tokens.accessToken = accessToken;
    tokens.refreshToken = refreshToken;
    return tokens;
  }
  return tokens;
};

export default getTokens;

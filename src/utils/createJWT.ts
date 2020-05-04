import jwt from "jsonwebtoken";

const createJWT = (id: number) : string => {
    const token = jwt.sign({
        id
    },
    "uSHA2wnzJ4rKLxNFWSJEmAwRwWVJd5Bvtkss97GZA2U28jmZGyjApAYaTwSsF4PkW84W2npReq4RzQVPC4baHHfCZFTcMFnEAyXG"
);
return token;
}

export default createJWT;
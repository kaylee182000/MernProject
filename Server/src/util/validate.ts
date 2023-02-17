import { cleanEnv } from "envalid";
import { str,port } from "envalid/dist/validators";

export default cleanEnv(process.env, {
    MONGODB_URL: str(),
    PORT: port(),
})
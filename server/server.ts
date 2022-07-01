import app from "./app";
import {createServer} from "http";

const http = createServer(app);

//server listening
const PORT = process.env.PORT || 8000;
http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

import http from "http";
import { routes } from './routes/routes';

const server = http.createServer((request, response) => {
    routes(request, response);
});

server.listen(3000, () => console.log(`✅ Server is running on port 3000`));
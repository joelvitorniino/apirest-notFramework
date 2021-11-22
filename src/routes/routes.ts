import { IncomingMessage, ServerResponse } from 'http';
import { RootController } from '../controllers/RootController';

export const routes = (request: IncomingMessage, response: ServerResponse) => {
    const Root = new RootController();
    if(request.url === '/' && request.method === 'GET') {
        Root.index(request, response);
    };

    if(request.url === '/register' && request.method === 'POST') {
        Root.store(request, response);
    };

    if(request.url === '/register' && request.method === 'PUT') {
        Root.update(request, response);
    };

    if(request.url === '/register' && request.method === 'DELETE') {
        Root.delete(request, response);
    }
};
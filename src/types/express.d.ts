export { };

declare global {
    namespace Express {
        interface Request {
            requestId?: string;
        }
        interface User {
            id: string;
            role: string;
        }

        interface Request {
            user?: User;
        }
    }
}
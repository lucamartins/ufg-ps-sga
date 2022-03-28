export const isReqEmptyBody = (body: any): boolean => body.constructor === Object && Object.keys(body).length === 0;

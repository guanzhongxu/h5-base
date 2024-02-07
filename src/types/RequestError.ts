export type RequestError = [(msg: string) => boolean, (msg: string) => Promise<unknown>];

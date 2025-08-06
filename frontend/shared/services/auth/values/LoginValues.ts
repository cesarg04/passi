export interface ILoginValues {
    query?: any;
    params?: any;
    body?: ILoginBody;
}


export interface ILoginBody {
    password: string;
    email: string;
}
export interface IRegisterValues {
    query?: any;
    params?: any;
    body?: IRegisterBody;
}


export interface IRegisterBody {
    name: string;
    password: string;
    email: string;
}
export interface ICreateTaskValues {
    query?: any;
    params?: any;
    body?: ICreateTaskBody;
}


export interface ICreateTaskBody {
    title:       string;
    description: string;
}


export type ResetRequest={
    Email: string;
}

export type NewPassword={
    Email: string;
    Password: string;
    ConfirmPassword:string;
}

export type ConfirmReset={
    ResetCode:number;
    Email:string;
}
import { useApiMutation } from "./useApi";



export class AuthApi  {

    static checkEmail = ()=>{
       return useApiMutation<{message:string}, {email:string|undefined}>(
        "post",
        "/auth/check-email"
        );
    }
}

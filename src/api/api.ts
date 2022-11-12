
import {dataFormType} from "../feature/registration/Registration";
import {instance} from "./instance";





export const authApi = {
    SingUp(dataForm:dataFormType){
        instance.post<{addedUser:any,error?:string}>('/auth/register',dataForm)
    }
}
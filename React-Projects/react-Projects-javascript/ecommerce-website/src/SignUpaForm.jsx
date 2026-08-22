import { useState } from "react";
import { useForm} from "react-hook-form";

export default function SignUpForm()
{
    const{register,handleSubmit,formState:{errors}}=useForm();

function onSubmit(e)
{
alert("Data Added !")
}
return(
    <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label >Email</label>
            <input type="email" 
            {...register("email",{
          required:"this Field Is Required",
          pattern:{
            value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message:"Invaled Pattren"
          }
            })}
            
            />
            {errors.email && <span style={{color: "red"}}>{errors.email.message}</span>}
            
        </div>

            <div>
                <label >Password</label>
                <input type="password"
                {...register("password",{
                    required:"Password Is Required",
                    minLength:{
                        value:4,
                        message:"Password Cant be less then 3"
                    }
                })}
                
                />
            {errors.password && <span style={{color: "red"}}>{errors.password.message}</span>}

            </div>


            <button type="submit">Submit</button>
        

        </form>
    </div>
)
}

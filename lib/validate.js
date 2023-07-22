export default function login_validate(values){
    let errors = {};
    //validation for email
    if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      //validation for password
    if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length<2 || values.password.length> 30) {
        errors.password = 'Invalid password';
      }else if(values.password.includes(" ")){
        errors.password = "Password can not be Empty!!"
      }
      return errors
}


export function register_validate(values){
    let errors = {};
    //validation for userName
    if(!values.username){
        errors.username = "Required"
    }else if(values.username.includes(" ")){
        errors.username="No empty space!!"
    }
     //validation for email
     if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      //validation for password
    if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length<2 || values.password.length> 30) {
        errors.password = 'Invalid password';
      }else if(values.password.includes(" ")){
        errors.password = "Password can not be Empty!!"
      }
       //validation for confirm password
    if (!values.cpassword) {
        errors.cpassword = 'Required';
      } else if (values.password !== values.cpassword) {
        errors.cpassword = 'Password not match!!';
      }else if(values.cpassword.includes(" ")){
        errors.cpassword = "Password can not be Empty!!"
      }
      return errors
}

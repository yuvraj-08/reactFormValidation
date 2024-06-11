import { useState } from 'react'
import './App.css'
import FormInput from './components/FormInput'
import axios from 'axios';
import { useSnackbar} from 'notistack';

function App() {
  
  const { enqueueSnackbar } = useSnackbar();

  const [values,setValues] = useState({
    username:"",
    email:"",
    birthday:"",
    password:"",
    confirmPassword:"",
  });

  const inputs = [
    {
    id:1,
    name:"username",
    type: "text",
    placeholder:"Username",
    errorMessage:"Username should be 3-16 characters and shouldn't include any special character!",
    label:"Username",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true
    },
    {
      id:2,
      name:"email",
      type: "email",
      placeholder:"Email",
      errorMessage:"Enter a valid email address!",
      label:"Email",
    required: true
    },
    {
      id:3,
      name:"birthday",
      type: "date",
      placeholder:"Birthday",
      label:"Birthday"
    },
    {
      id:4,
      name:"password",
      type: "password",
      placeholder:"Password",
      errorMessage:"Password should be 8-20 characters long and must include atleast 1 letter, 1 number and 1 special character!",
      label:"Password",
      pattern:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true
    },
    {
      id:5,
      name:"confirmPassword",
      type: "password",
      placeholder:"Confirm Password",
     errorMessage:"Passwords don't match!",
      label:"Confirm Password",
      pattern: values.password,
    required: true
    }
  ]

  const onChange = (e) =>{
    setValues({...values, [e.target.name]: e.target.value });
  };

  console.log(values);

 const handleSubmit = (e) =>{
    e.preventDefault();
    const data = values;
    console.log(values);
    axios
      .post('https://3000-yuvraj08-reactformvalid-vaefd2ie6ng.ws-us114.gitpod.io/', data)
      .then(()=>{
        enqueueSnackbar('Registeration Done Successfully', {variant: 'success'});
      })
      .catch((error) => {
        // alert('An error occured, Please Check console');
        enqueueSnackbar('Error', {variant:'error'});
        console.log(error);
      });
  }

  return (
    <div className='App'>
      <form action="" onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input)=>(
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
        ))}
        <button type="submit">Submit</button>             
      </form> 
      
    </div>
  )
}

export default App

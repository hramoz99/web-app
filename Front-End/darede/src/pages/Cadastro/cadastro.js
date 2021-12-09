import './cadastro.css'
import cadastro1 from "../../assets/cadastro.png"
import axios from 'axios';
import { Form } from 'react-bootstrap';
import React, {useState} from 'react';
import { parseJwt } from '../../services/auth';
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import {BsFillPersonFill as Person} from "react-icons/bs";
import {AiOutlineMail as EmailIcon} from "react-icons/ai"
import {MdPassword as PasswordIcon} from "react-icons/md"
import { BsPhone as PhoneIcon } from 'react-icons/bs';
import {BiCar as CarIcon} from "react-icons/bi"



export default function Cadastro() {

    //   state = {
    //     selectedFile : null,

    //   }
    // //Name, Email, Password, Phone e Image
    // fileSelectedHandler = event => {
    //     this.setState({

    //       selectedFile : event.target.files[0]
    //     })

    //     }

    //     fileUploadHandler = () => {
    //       const fd = new FormData();
    //       fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    //     axios.post('http://localhost:5000/api/User/create-account', fd)
    //     .then(res => {
    //       console.log(res);
    //     });
    //     }
   //Name, Email, Password, Phone e Image


    // VARIÁVEIS PARA CADASTRO DE CONSULTAS
    const [Name, setName] = useState("")
    console.log(Name)

    const [Email, setEmail] = useState("")
    console.log(Email)

    const [Password, setPassword] = useState("")
    console.log(Password)

    const [Phone, setPhone] = useState("")
    console.log(Phone)

    const [Image, setImage] = useState("")
    console.log(Image)

    const[Plate, setPlate] = useState("")

    const[TypeUser, setTypeUser] = useState(2)

    const history = useHistory()

    async function handleSubmit(event) {
      event.preventDefault();
    
      const formData = new FormData();
    
      formData.append('name', Name);
      formData.append('email', Email);
      formData.append('password', Password);
      formData.append('phone', parseInt(Phone));
      //formData.append('imagePlate', Image);
      formData.append('plate', Plate)
      formData.append('typeUser', TypeUser)
    
      try {
        await axios.post('http://localhost:5000/api/User/create-account', {
          name : Name,
          email : Email,
          password : Password,
          phone : Phone,
          imagePlate : "",
          plate : Plate,
          typeUser : TypeUser
        })
        
        .then(response => {
          if(response.status === 200){
            console.log('Usuário cadastrado com sucesso!')
            history.push("/login")
          }
        })

        } catch (error) {
        throw new Error(error.message)
      }
    }

  return (
    <div className="Cadastro">



      <div className="cadastro__Container3">
      <div className="separador"></div>
          <h1>cadastre-se</h1>

          <div className="separador"></div>

        <form className="formCadastro" onSubmit={handleSubmit}>
          
          <div className="linhaInput">

            <label className="iconInput"><Person size={20}/></label>
            <input
              placeholder="Nome"
              className='cadastro__input'
              type='text'
              name='name'
              value={Name}
              required
              onChange={(event) => {setName(event.target.value)}}
            
          />

          </div>
         

            <div className="linhaInput">
            <label className="iconInput"><EmailIcon size={20}/></label>
              <input
                placeholder="Email"
                className='cadastro__input'
                type='email'
                name='email'
                value={Email}
                required
                onChange={(event) => {setEmail(event.target.value)}}

              />
            </div>

        

            <div className="linhaInput">
              <label className="iconInput"><PasswordIcon size={20}/></label>
                <input
                  placeholder="Senha"
                  type='password'
                  name='password'
                  className='cadastro__input'
                  value={Password}
                  required
                  onChange={(event) => {setPassword(event.target.value)}}

                />
            </div>

         


          <div className="linhaInput">
              <label className="iconInput"><PhoneIcon size={20}/></label>
              <input
                placeholder="Telefone/Celular: (xx) 99999-9999"
                className='cadastro__input'
                type='text'
                name='phone'
                value={Phone}
                required
                onChange={(event) => {setPhone(event.target.value)}}

              />
          </div>
       

          <div className="linhaInput">
              <label className="iconInput"><CarIcon size={20}/></label>
              <input
                placeholder="Insira a placa do seu veículo"
                className='cadastro__input'
                type='text'
                name='plate'
                value={Plate}
                onChange={(event) => {setPlate(event.target.value)}}
              /> 
          </div>

           


          <button type="submit" className='cadastro__botao'>
            CADASTRE-SE
          </button>
          </form>

          <div className="separador"></div>

          
      </div>

      <div className="separador"></div>

      <div className="cadastro_Container4">
            <p className="cadastro_p">Tem uma conta?
            <a href="/login">Entre no sistema</a>
            </p>

      </div>
     
     
    
      
    </div>




  );
}


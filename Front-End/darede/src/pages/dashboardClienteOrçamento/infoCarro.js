import './dashboardClienteOrçamento.css'
import Navbar from '../../components/Navbar'
import { BsTrash } from 'react-icons/bs'
import { BsPencil } from 'react-icons/bs'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { parseJwt } from '../../services/auth';
import Alert from 'react-bootstrap/Alert'
import React from 'react'
import ReactDom from  'react-dom'
import { Modal, Button }  from  'react-bootstrap'


export default function InfoCarro() {


  //Plate, Color, Year, City, Model, Brand, 


  // VARIÁVEIS PARA CADASTRO DE CONSULTAS
  const [Plate, setPlate] = useState("")
  

  const [Color, setColor] = useState("")
 

  const [Year, setYear] = useState("")
 
  const [City, setCity] = useState("")
  

  const [Model, setModel] = useState("")
  

  const [Brand, setBrand] = useState("")
  
  const[ImagePlate, setImagePlate] = useState("")


  const[erroMensagem, setErroMensagem] = useState("")


  const [show, setShow] = useState(false);
      
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // setStates para a listagem das informaçoes do veiculo
  const [infoCarro, setCarro] = useState([])


  // buscar os carros do usuário
 function limparCampos(){
  setPlate("")
  setColor("")
  setYear("")
  setCity("")
  setModel("")
  setBrand("")
 }

  // Funcionando
  function PostInfoCarro(event) {

      event.preventDefault()

      axios.post('http://localhost:5000/api/Car', {

          plate: Plate,
          color: Color,
          year: Year,
          city: City,
          model: Model,
          brand: Brand,
          idUser: parseJwt().jti


      }, {
          headers: {
              'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
          }
      })
          .then(resposta => {
              if (resposta.status === 200) {
                  setErroMensagem("informações do carro cadastrada!")
                  GetCarros();
                  limparCampos()
              }
          })
          .catch(erro => {
              console.log(erro)
              setErroMensagem("Carro não cadastrado!")
          })



  };


  function PostImagePlate(event){

      event.preventDefault();

      if(ImagePlate != null ){    

          const fd = new FormData();
          fd.append('image', ImagePlate)

          axios.put('http://localhost:5000/api/upload/upload-image', fd ,  {
          headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
          }
        })
      
  
        .then(response => {
          if(response.status === 200){
             console.log('upload feito com sucesso!')
             console.log(response.data)
          }
        })
  
        .catch((error) => console.log(error))
      } else {
        console.log('Nenhum arquivo foi selecionado!')
      }
      
  }

  function deleteCar(cars){
    axios.delete('http://localhost:5000/api/car/ ' + cars.idCar, {
      headers : {
        'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
      }
    })

    .then(response => {
      if(response.status === 202){
        GetCarros();
      }
    })

    .catch((erro) => {console.log(erro)})
  }


  
   async function GetCarros() {
      await axios.get('http://localhost:5000/api/Car/mycar/ ' + parseJwt().jti , {
        headers : {
          'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
        }
      })
          .then(response => {
              if (response.status === 200) {
                  setCarro(response.data)
                  setErroMensagem("Veículo listado com sucesso!")
              }
          })
          .catch((erro) => console.log(erro))
  }

  useEffect(() => {GetCarros() }, [{}])
  // funções para ciclos de vida 

  return(
    <div>
      <Navbar />
      <div className="dashboard">
        
           <div className="dashboard_fonte">
            <h2 className="titulo">Seus Carros</h2>
          </div> 
          {
            infoCarro.map((cars) => {
              return(
                <div className="lista" key={cars.idCar}>
                <p>Placa: {cars.plate}</p>
                <p>Marca: {cars.brand}</p>
                <p>Modelo: {cars.model}</p>
                <p>Cor: {cars.color}</p>
                <p>Ano: {cars.year}</p>
                <p><BsTrash onClick={() => deleteCar(cars)} style={{cursor : "pointer"}} size={25} /></p>
              </div>
              )
            })
          }

            <button style={{width : 200, height : 60}}  onClick={handleShow} className="btnAdd" >Cadastrar novo veiculo</button>

            <Modal show={show} onHide={handleClose} >
                  <Modal.Header closeButton>
                      <Modal.Title><p className="p-title-modal">Cadastrar novo veículo</p></Modal.Title>
                  </Modal.Header>
                  <form onSubmit={ImagePlate === "" ? PostInfoCarro : PostImagePlate}>
                  <Modal.Body>
                      <div className="linha-input-1">
                          <input type="text" name={Plate} value={Plate} onChange={(event) => {setPlate(event.target.value)}} placeholder="Placa do carro: "  />
                          <input type="text" name={Model} value={Model} onChange={(event) => {setModel(event.target.value)}} placeholder="Modelo: " />
                      </div>
                  </Modal.Body>
                  <Modal.Body>
                      <div className="linha-input-1">
                          <input type="text" name={Brand} value={Brand} onChange={(event) => {setBrand(event.target.value)}} placeholder="Marca: " />
                          <input type="text" name={Color} value={Color}onChange={(event) => {setColor(event.target.value)}} placeholder="Cor: "  />
                      </div>
                  </Modal.Body>
                  <Modal.Body>
                      <div className="linha-input-1">
                        <input type="text" name={Year} value={Year} onChange={(event) => {setYear(event.target.value)}} placeholder="Ano do modelo: "  />
                        <input type="text" name={City} value={City} onChange={(event) => {setCity(event.target.value)}} placeholder="Município: "  />
                      </div>
                  </Modal.Body>
                  <Modal.Body>
                  <h2 style={{textAlign : 'center', marginTop : 10, marginBottom : 30}}>OU</h2>
                    <div className="linha-input-1">
                      
                        <input type="file" name={ImagePlate} value={ImagePlate} onChange={(event) => setImagePlate(event.target.value)} placeholder="Imagem: "  />
                        <button className="btnAdd" type="submit">ADICIONAR</button>
                    </div>
                  </Modal.Body>
                  </form>  
                  </Modal>
         
      </div>
    </div>
  )
}
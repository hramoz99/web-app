import '../dashboardClienteOrçamento/dashboardClienteOrçamento.css'
import { useEffect, useState } from 'react'
import  Navbar  from '../../components/NavbarAdmin/Navbar'
import { BsTrash } from 'react-icons/bs'
import { parseJwt } from '../../services/auth'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import React from 'react'
import ReactDom from  'react-dom'
import {Modal, Button} from 'react-bootstrap'

export default function OrcamentoAdmin(){

    const [show, setShow] = useState(false);
    const[IdModel, setIdModel] = useState(0)
    const[IdService, setIdService] = useState(0)
    const[TotalValue, setTotalValue] = useState(0)

    const[listServices, setListServices] = useState([])
    const[listModels, setListModels] = useState([])
    const[listBudgets, setListBudgets] = useState([])
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        function GetServices(){
            axios.get('http://localhost:5000/api/service', {
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })

            .then(response => {
                if(response.status === 200){
                    setListServices(response.data)
                }
            })

            .catch((erro) => console.log(erro))
        }

        function GetModel(){
            axios.get('http://localhost:5000/api/Model', {
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
    
            .then(response => {
                if(response.status === 200){
                    setListModels(response.data)
                }
            })
    
            .catch(erro => console.log(erro))
        }

        function PostBudget(){
            axios.post('http://localhost:5000/api/budget/create-budget', {
                idModel : IdModel,
                idService : IdService,
                totalValue : TotalValue
            }, {
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })

            .then(response => {
                if(response.status === 200){
                    console.log('Orçamento cadastrado com sucesso!')
                    GetBudgets();
                }
            })

            .catch((erro) => console.log(erro))
        }

        function GetBudgets(){
            axios.get('http://localhost:5000/api/budget', {
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })

            .then(response => {
                if(response.status === 200){
                    setListBudgets(response.data)
                }
            })

            .catch((erro) => console.log(erro))
        }

        function deleteBudget(budgets){
            axios.delete('http://localhost:5000/api/budget/ ' + budgets.idBudget, {
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })

            .then(response => {
                if(response.status === 202){
                    GetBudgets();
                }
            })

            .catch((erro) => {console.log(erro)})
        }

        useEffect(GetServices, [])
        useEffect(GetModel, [])
        useEffect(GetBudgets, [])
    return(
        <div>
            <Navbar />
            <div className="dashboard">
                <div className="dashboard_fonte">
                    <h2 className="titulo">CADASTRAR PRÉ-ORÇAMENTOS</h2>
                </div>
                <form onSubmit={PostBudget}>
                <div className="inputs">
                    <div className="linha-input-2">
                        <select name={IdService} value={IdService} onChange={(event) => {setIdService(event.target.value)}}>
                            <option  Disabled value="0">----Selecione o problema----</option>
                            {
                                listServices.map((services) => {
                                    return(
                                        <option key={services.idService}  value={services.idService}>
                                            {services.problem}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="linha-input-2">
                        <select name={IdModel} value={IdModel} onChange={(event) => {setIdModel(event.target.value)}}>
                            <option  Disabled value="0">----Selecione o modelo----</option>
                            {
                                listModels.map((models) => {
                                    return(
                                        <option key={models.idModel}  value={models.idModel}>
                                            {models.nameModel}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="linha-input-2">
                        <input type="int" value={TotalValue} name={TotalValue} onChange={(event) => {setTotalValue(event.target.value)}} placeholder="Valor estimado(peças + mão-de-obra) "  />
                    </div>
                    <button className="btnAdd" type="submit" >ADICIONAR</button>
                </div>
                </form>
            </div>
            <div className="dashboard_fonte">
                    <h2 className="titulo">ORÇAMENTOS</h2>
            </div>
            {
                listBudgets.map((budgets) => {
                    return(
                        <div key={budgets.idBudget} className="lista">
                            <p>Problema: {budgets.service.problem}</p>
                            <p>Modelo: {budgets.model.nameModel}</p>
                            <p>Valor estimado: R$ {budgets.totalValue}</p>
                            <p><BsTrash onClick={() => {deleteBudget(budgets)}} style={{cursor: 'pointer'}} size={25}/></p>
                        </div>
                    )
                })
            }

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><p className="p-title-modal">Orçamento cadastrado</p></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="line-car">
                            <p><p style={{fontWeight : 'bold'}}>Problema:</p>Porta amassada: </p>
                            <p><p style={{fontWeight : 'bold'}}>Marca:</p>Nissan </p>
                            <p><p style={{fontWeight : 'bold'}}>Modelo:</p>Sentra </p>
                            <p><p style={{fontWeight : 'bold'}}>Valor:</p>R$ 280</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btnAdd2" variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            
        </div>
    )
}
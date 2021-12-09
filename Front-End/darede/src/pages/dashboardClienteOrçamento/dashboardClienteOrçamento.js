import Navbar from "../../components/Navbar";
import './dashboardClienteOrçamento.css';
import { Modal, Button }  from  'react-bootstrap'
import { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';

import React from 'react'
import ReactDom from  'react-dom'
import { parseJwt } from "../../services/auth";

function DashboardClienteOrçamento() {
    
    const [show, setShow] = useState(false);
    const[listBudgets, setListBudgets] = useState([])
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getBudgets(){
        axios.get('http://localhost:5000/api/budget/mybudgets/' + parseJwt().jti, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then(response => {
            if(response.status === 200){
                setListBudgets(response.data)
            }
        })

        .catch((error) => console.log(error))
    }
    
    function plusValue(budgets){
       

        for(let i=0; i < budgets.idBudget.length; i++){
            let Values = [budgets.totalValue]

            let Soma = Values[0] + Values[1]

            console.log(Soma);
            return <h2>{Soma}</h2>;
        }

       
    }

    return (
        <div >
            <Navbar />
            <div className="dashboard">
                <div className="dashboard_fonte">
                    <h2 className="titulo">PRÉ-ORÇAMENTOS </h2>
                    <p>* Pré-orçamentos gerados com base em problemas que a funilaria consiga resolver em veículos da mesma marca e modelo que o seu.</p>
                </div>
               
                <div className="card-orcamento" onClick={getBudgets}>
                    <h2 className="subtitulo">Serviços para seu carro </h2>
                    <div className="bar"></div>
                </div>

                {
            listBudgets.map((budgets) => {
              return(
                <div className="lista" key={budgets.idBudget}>
                <p><strong>Modelo:</strong> {budgets.model.nameModel}</p>
                <p><strong>Problema:</strong> {budgets.service.problem}</p>
                <p><strong>Valor estimado:</strong> {budgets.totalValue}</p>
                <p><strong>Atribuir</strong> <input name="isGoing"
                                                   type="checkbox"
                                                   onChange={() => plusValue(budgets)}
                                                    /></p>
              </div>
              )
            })
          }

          {plusValue}
                   
            </div>
        </div>
    )
}

export default DashboardClienteOrçamento;

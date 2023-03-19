import React, {useEffect, useState} from 'react'
import './Service.css'
import axios from 'axios'

function Service() {
  const [service, setService] = useState({
    name:'', 
    description:'',
    amountPaid:'',
    payDate:'',
    initialDate:'',
    endDate:'',
    serviceValue:'',
    status:'',
  })
  const [services, setServices] = useState([])
  const [update, setUpdate] = useState()

  useEffect(()=> {
    axios.get("http://localhost:8080/api/services/").then(result => {
      setServices(result.data)
    })
  }, [update])

  function handleChange(event){
    setService({...service,[event.target.name]:event.target.value})
  }

  function handleSubmit(event){
    event.preventDefault();
    axios.post('http://localhost:8080/api/services/', service).then(result => {
      setUpdate(result) //Atualizar
    })
  }

  return (
    <div className='container'>
      <h1>Cadastro de Serviços</h1>
      <form onSubmit={handleSubmit}>
        <div className='col-6'>
          <div>
            <label className='form-label'>Nome do Cliente</label>
            <input onChange={handleChange} 
              value={service.name} 
              name="name" 
              type="text" 
              className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Data de Início</label>
            <input onChange={handleChange} 
              value={service.initialDate} 
              name="initialDate"
              type="date"
               className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Data de Término</label>
            <input onChange={handleChange} 
              value={service.endDate}
              name="endDate" 
              type="date" 
              className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Descrição do Serviço</label>
            <input onChange={handleChange}
              value={service.description} 
              name="description" 
              type="text" 
              className='form-control'/>
          </div>
          <div>
            <label className='form-label'>Valor do Serviço</label>
            <input onChange={handleChange} 
              value={service.serviceValue} 
              name="serviceValue" 
              type="number" 
              className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Valor Pago</label>
            <input onChange={handleChange} 
              value={service.amountPaid} 
              name="amountPaid" 
              type="number" 
              className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Data de Pagamento</label>
            <input onChange={handleChange} 
              value={service.payDate} 
              name="payDate" 
              type="date" 
              className='form-control'
            />
          </div>

          <br/>
          <input type="submit" value="Cadastrar" className='btn btn-success' />
        </div>
      </form>

      <hr /><hr />

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor do Serviço</th>
            <th scope="col">Status</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {
            services.map(obj => (
              <tr>
                <th>{obj.name}</th>
                <td>{obj.description}</td>
                <td>{obj.serviceValue}</td>
                <td>{obj.status}</td>
                <td>
                  <button className='btn btn-primary btn-sm'>Alterar</button> &nbsp;&nbsp;
                  <button className='btn btn-danger btn-sm'>Excluir</button>  &nbsp;&nbsp;
                  <button className='btn btn-warning btn-sm'>Cancelar</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Service;

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

  function findAll(){
    axios.get("http://localhost:8080/api/services/").then(result => {
      setServices(result.data)
    })
  }

  function pendingAll(){
    axios.get("http://localhost:8080/api/services/pedingPayment").then(result => {
      setServices(result.data)
    })
  }

  function canceledAll(){
    axios.get("http://localhost:8080/api/services/canceledPayment").then(result => {
      setServices(result.data)
    })
  }

  function clean(){
    setService({
      name:'', 
      description:'',
      amountPaid:'',
      payDate:'',
      initialDate:'',
      endDate:'',
      serviceValue:'',
      status:'',
    })
  }

  function deleteObj(id){
    axios.delete(`http://localhost:8080/api/services/${id}`).then(result => {
      setUpdate(result)
    })
  }

  function canceledObj(id){
    axios.post(`http://localhost:8080/api/services/${id}`).then(result => {
      setUpdate(result)
    })
  }

  function handleSubmit(event){
    event.preventDefault();
    if(service.id == undefined) {
        axios
        .post('http://localhost:8080/api/services/', service)
        .then(result => {
        setUpdate(result) //Atualizar
      })
    }
    else {
        axios
        .put('http://localhost:8080/api/services/', service)
        .then(result => {
        setUpdate(result) //Atualizar
      })
    }
    clean()
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
              value={service.initialDate || ''} 
              name="initialDate"
              type="date"
               className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Data de Término</label>
            <input onChange={handleChange} 
              value={service.endDate || ''}
              name="endDate" 
              type="date" 
              className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Descrição do Serviço</label>
            <input onChange={handleChange}
              value={service.description || ''} 
              name="description" 
              type="text" 
              className='form-control'/>
          </div>
          <div>
            <label className='form-label'>Valor do Serviço</label>
            <input onChange={handleChange} 
              value={service.serviceValue || ''} 
              name="serviceValue" 
              type="number" 
              className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Valor Pago</label>
            <input onChange={handleChange} 
              value={service.amountPaid || ''} 
              name="amountPaid" 
              type="number" 
              className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Data de Pagamento</label>
            <input onChange={handleChange} 
              value={service.payDate || ''} 
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
      <button onClick={() => findAll()} type="button" class="btn btn-primary">Todos os serviços</button>
      <button onClick={() => pendingAll()} type="button" class="btn btn-secondary">Pagamentos Pendentes</button>
      <button onClick={() => canceledAll()}type="button" class="btn btn-success">Serviços Cancelados</button>

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
                  {obj.status != 'canceled' && 
                    <button onClick={()=> setService(obj)} className='btn btn-primary btn-sm'>Alterar</button> 
                  }&nbsp;&nbsp;
                  {obj.status != 'canceled' && 
                    <button onClick={()=> deleteObj(obj.id)} className='btn btn-danger btn-sm'>Excluir</button>
                  }&nbsp;&nbsp;
                  <button onClick={()=> canceledObj(obj.id)} className='btn btn-warning btn-sm'>Cancelar</button>
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

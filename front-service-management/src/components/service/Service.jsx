import React, {useEffect, useState} from 'react'
import './Service.css'

function Service() {
  const [service, setService] = useState({
    name:'', 
    description:'',
    amountPaid:'',
    payDate:'',
    initialDate:'',
    endDate:''
  })
  const [services, setServices] = useState([])

  function handleChange(event){
    setService({...service,[event.target.name]:event.target.value})
  }

  function handleSubmit(event){
    event.preventDefault();
    console.log(service)
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
    </div>
  )
}

export default Service;

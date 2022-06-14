import React,{ useState } from 'react'; 

import './App.css';
import { dientes, procedimiento, partes } from './data' 

const ItemDiente = ({ item, onClick, selectDiente, listDgDiente }) => {

  const hasSelectDiente = (parte,diente) => {
    const res = selectDiente.filter((item)=> item.diente===diente&&item.parte===parte );
    if(res.length==0){ return false; }
    return true;
  }
  const hasProdDiente = (parte,diente) => { 
    const res = listDgDiente.find((item)=> item.diente===diente&&item.parte===parte );
    if(res){ return res; }
    const nulo = {}
    return nulo;
  }
  return(
    <div className='item-diente'>
      <h3>{item.diente}</h3>
      <div className="base">
        {
          partes.map((di)=>{
            const classstyle = di.codigo==5?"p5 hoverParte":"parte hoverParte p"+di.codigo
            const infoDg = hasProdDiente(di.codigo,item.diente)
            const selected = hasSelectDiente(di.codigo,item.diente) 
            const backcolor = infoDg.diente?infoDg.procedimiento.color:selected?"#4C5270":"#fff"
            return(
              <div className={classstyle}  
                title={infoDg?.diente?backcolor:"Normal" }
                style={{backgroundColor:backcolor}}
                onClick={()=>infoDg?.diente||selected?null:onClick({parte: di.codigo, diente: item.diente})}></div>
            )
          })
        } 
      </div>
    </div>
  )
}

function App() {
  const [ selectDiente, setSelectDiente ] = useState([]);
  const [ listDgDiente, setDgDiente ] = useState([]);
  const [ cantidad, setCantidad ] = useState(0);

  const [ selectProcedimiento, setSelectProcedimiento ] = useState(0);
  const [ txtObservacion, setTxtObservacion ] = useState(''); 

  console.log(listDgDiente)

  const onClickDiente = ({parte, diente}) => {
    const data = selectDiente;
    data.push({ diente, parte });
    setCantidad(cantidad+1)
    setSelectDiente(data);
  }

  const loadItemDiente = (num) => {
    return dientes.filter((item)=> item.cuadro === num ).map((item,i)=>{
      return(<ItemDiente key={i} item={item} onClick={onClickDiente} 
        listDgDiente={listDgDiente}
        selectDiente={selectDiente}/>)
    })
  }

  const onClickAddProcedimiento = () => {
     
    const data = listDgDiente
    const procd = procedimiento.find((itemP)=> itemP.id == selectProcedimiento )
     
    selectDiente.map((item)=>{
      const newItem = {
        ... item, 
        procedimiento: procd
      }
      data.push(newItem);
    })
    setDgDiente(data);
    setCantidad(0);
    setSelectDiente([]);
  }

  const eliminarDiente = (item) => { 
    const resData = listDgDiente.filter(items => !(items.diente == item.diente && items.parte == item.parte )  )
    setDgDiente(resData)
  }

  return (
    <div className="App row" >

      <div className='col-md-8'>

        <div class="card ">
          <div class="card-header">
            <h2>Odontograma  {cantidad}</h2> 
          </div>
          <div class="card-body row">  
          <div className='filaCuadro'>
            <div className='cuadro c1'> { loadItemDiente(1) } </div>
            <div className='cuadro c2'> { loadItemDiente(2) } </div> 
          </div>
          <div className='filaCuadro'>
            <div className='cuadro c3'> { loadItemDiente(3) } </div>
            <div className='cuadro c4'> { loadItemDiente(4) } </div> 
          </div> 

          </div>
        </div>

      </div>
 
      
      <div className='col-md-4'>

        <div class="card ">
            <div class="card-header">
              Adicionar
            </div>
            <div class="card-body row">
              
            <div class="col-md-6">
              <label class="form-label">Observacion</label>
              <input type="text" class="form-control" placeholder="..." 
                onChange={(event)=>setTxtObservacion(event.target.value)} />
            </div>
            <div class="col-md-6">
              <label for="disabledSelect" class="form-label">Procedimiento</label>
              <select id="disabledSelect" class="form-control" 
                onChange={(event)=>setSelectProcedimiento(event.target.value)}>
                  <option></option> 
                {
                  procedimiento.map((item)=>{
                    return(
                      <option value={item.id}> 
                         {item.nombre}
                      </option> 
                    )
                  })
                }
              </select>
            </div> 

            <div class="col-md-6"> 
              <br/>
              <a href="#" class="btn btn-primary" onClick={()=>onClickAddProcedimiento()}>Agregar</a>
            </div> 

            </div>
          </div>
  
      </div>

      <div className='col-md-12'>

        <div class="card ">
            <div class="card-header">
              Resultados
            </div>
            <div class="card-body">  

              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Diente</th>
                    <th scope="col">Lado</th>
                    <th scope="col">Procedimiento</th>
                    <th scope="col">Observacion</th>
                    <th scope="col">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listDgDiente.map((item,i)=>{
                      return(
                      <tr>
                        <th scope="row">{i+1}</th>
                        <td>{item.diente}</td>
                        <td>{partes.find((ipt)=>ipt.codigo==item.parte).nombre}</td>
                        <td style={{display:'flex', alignItems:'center'}}>
                          <div style={{width:10,height:10,margin:8,
                            backgroundColor:item.procedimiento.color, borderRadius:50}}></div>
                          {" "+ item.procedimiento.nombre}
                        </td>
                        <td></td>
                        <td>
                          <button type="button" class="btn btn-outline-danger" onClick={()=>eliminarDiente(item)}>Eliminar</button>
                        </td>
                      </tr> 
                      )
                    })
                  }
                </tbody>
              </table>
              
            </div>
        </div>
   
      </div>

        
    </div>
  );
}

export default App;

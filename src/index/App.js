import React,{ useState } from 'react'; 

import './App.css';
import { dientes, procedimiento, partes } from './data' 

const ItemDiente = ({ item, onClick, selectDiente, listDgDiente, colorDiente, tipoDiente }) => {
 
  const hasProdDiente = (parte,diente) => { 
    const res = selectDiente.find((item)=> item.diente===diente&&item.parte===parte );
    if(res){ return res; }
    const nulo = {}
    return nulo;
  }

  //if( infoDg?.colorDiente  )

  const hasDiente = () => {

    return selectDiente.find((item2)=> item2.diente===item.diente ); 

  }

  let dataDiente = hasDiente()  
  let hasGroup = dataDiente?.tipoDiente === 'grupo'
  let styleDiente = dataDiente?.procedimiento == 6? 'item-diente puente' : 'item-diente'
  let styleBase = dataDiente?.procedimiento == 5? 'base corona' : 'base'

  return(
    <div className={styleDiente}>
      <h3>{item.diente} </h3>

      <div className={styleBase}>
        {
          partes.map((di)=>{
            const classstyle = di.codigo==5?"p5 hoverParte":"parte hoverParte p"+di.codigo
            const infoDg = hasProdDiente(di.codigo,item.diente) 
            //const backcolor = infoDg.diente?infoDg.procedimiento.color:selected?"#4C5270":"#fff"
            //const backcolor = selected?colorDiente:"#fff"
            const backcolor = hasGroup || !infoDg ? "#fff" : infoDg?.colorDiente
            
            return(
              <div className={classstyle}  
              title={infoDg?.diente?backcolor:"Normal" }
              style={{backgroundColor:backcolor}}
              onClick={()=> hasGroup && !dataDiente ? alert('nada'):onClick({parte: di.codigo, diente: item.diente})}></div>
            )
          })
        } 
      </div>
        {
          dataDiente?.procedimiento == 3 && <div style={{position:'absolute', top:55, right:-5}}>
            <img src={require('./cross.png')} alt="Diente extraido" width={70}/>
            </div>
        }
         {
          dataDiente?.procedimiento == 7 && <div style={{position:'absolute', top:55, right:-5}}>
            <img src={require('./implant.png')} alt="Diente implante" width={70}/>
            </div>
        }
    </div>
  )
}

function App() {
  const [ selectDiente, setSelectDiente ] = useState([]);
  const [ listDgDiente, setDgDiente ] = useState([]);
  const [ cantidad, setCantidad ] = useState(0);

  const [ selectProcedimiento, setSelectProcedimiento ] = useState(0);
  const [ colorDiente, setColorDiente ] = useState('cyan')
  const [ tipoDiente, setTipoDiente] = useState('individual');  

  //console.log(listDgDiente)

  const onClickDiente = ({parte, diente}) => {
    const data = selectDiente;
    data.push({ diente, parte, tipoDiente, colorDiente, procedimiento: selectProcedimiento });
    setCantidad(cantidad+1)
    setSelectDiente(data);
  }

  const loadItemDiente = (num) => {
    return dientes.filter((item)=> item.cuadro === num ).map((item,i)=>{
      return(<ItemDiente 
        key={i} 
        item={item} 
        onClick={onClickDiente} 
        tipoDiente={tipoDiente}
        colorDiente={colorDiente}
        listDgDiente={listDgDiente}
        selectDiente={selectDiente}/>)
    })
  }  

  const handleProcedimiento = (value) => { 
    setSelectProcedimiento(value)  
    procedimiento.map((item)=> {
      if(item.id == value ){
        setColorDiente(item.color)
        setTipoDiente(item.tipo)
      }
    })
  }

  const eliminarDiente = (item) => { 
    const resData = listDgDiente.filter(items => !(items.diente == item.diente && items.parte == item.parte )  )
    setDgDiente(resData)
  }

  const getNameProcedimiento = (id) => {
    return  procedimiento.find(items => items.id == id )
  }

  const getNameParte = (id) => {
    return  partes.find(items => items.codigo == id )
  }

  return (
    <div class="container">
      
        <h1>Odontograma {cantidad}</h1>

        <div class="content"> 

          <div class="box-input">
            <label  class="form-label">Procedimiento {tipoDiente}</label>
            <select  class="form-control" onChange={(event)=>handleProcedimiento(event.target.value)}>
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

          <br></br>
          <hr/>
          <br></br>
             
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

            <br/>
            <hr/>
            <br/>

            <table class="table">
              <thead>
                  <tr> 
                      <th>Pieza</th>
                      <th>Cara</th>
                      <th>Procedimiento</th>
                  </tr>
              </thead>
              <tbody>
                {
                  selectDiente.map((itemDi)=>{
                    return(
                      <tr>
                          <td>{itemDi.diente}</td>
                          <td>{ getNameParte(itemDi.parte).nombre }</td>
                          <td>{ getNameProcedimiento(itemDi.procedimiento)?.nombre}</td>
                      </tr>
                    )
                  })
                }
                   
              </tbody>
            </table>


            <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Diente</th>
                    <th scope="col">Lado</th>
                    <th scope="col">Procedimiento</th> 
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


   
 
      

      // <div className='col-md-8'>


 
      //   <div className='col-md-12'>

      //     <div class="card ">
      //         <div class="card-header">
      //           Adicionar
      //         </div>
      //         <div class="card-body row">
                
      //         <div class="col-md-6">
      //           <label class="form-label">Observacion</label>
      //           <input type="text" class="form-control" placeholder="..." 
      //             onChange={(event)=>setTxtObservacion(event.target.value)} />
      //         </div>
      //         <div class="col-md-6">
      //           <label for="disabledSelect" class="form-label">Procedimiento</label>
      //           <select id="disabledSelect" class="form-control" onChange={(event)=>setSelectProcedimiento(event.target.value)}>
      //               <option></option> 
      //             {
      //               procedimiento.map((item)=>{
      //                 return(
      //                   <option value={item.id}> 
      //                     {item.nombre}
      //                   </option> 
      //                 )
      //               })
      //             }
      //           </select>
      //         </div> 

      //         <div class="col-md-6"> 
      //           <br/>
      //           <a href="#" class="btn btn-primary btn-block" onClick={()=>onClickAddProcedimiento()}>Agregar</a>
      //         </div>  
      //         </div>
      //       </div> 
      //   </div>

      // </div>
 
      

      // <div className='col-md-12'>

      //   <div class="card ">
      //       <div class="card-header">
      //         Resultados
      //       </div>
      //       <div class="card-body">  

              // <table class="table">
              //   <thead class="thead-dark">
              //     <tr>
              //       <th scope="col">#</th>
              //       <th scope="col">Diente</th>
              //       <th scope="col">Lado</th>
              //       <th scope="col">Procedimiento</th>
              //       <th scope="col">Observacion</th>
              //       <th scope="col">Accion</th>
              //     </tr>
              //   </thead>
              //   <tbody>
              //     {
              //       listDgDiente.map((item,i)=>{
              //         return(
              //         <tr>
              //           <th scope="row">{i+1}</th>
              //           <td>{item.diente}</td>
              //           <td>{partes.find((ipt)=>ipt.codigo==item.parte).nombre}</td>
              //           <td style={{display:'flex', alignItems:'center'}}>
              //             <div style={{width:10,height:10,margin:8,
              //               backgroundColor:item.procedimiento.color, borderRadius:50}}></div>
              //             {" "+ item.procedimiento.nombre}
              //           </td>
              //           <td></td>
              //           <td>
              //             <button type="button" class="btn btn-outline-danger" onClick={()=>eliminarDiente(item)}>Eliminar</button>
              //           </td>
              //         </tr> 
              //         )
              //       })
              //     }
              //   </tbody>
              // </table>
              
      //       </div>
      //   </div>
   
      // </div> 
        
 
  );
}

export default App;

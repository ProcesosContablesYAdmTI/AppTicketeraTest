import React, { useState, useEffect } from 'react';
import { Spin, Steps, Table } from 'antd';
import { sp_api_get_json } from '../../api/sp_api_json';
import { Link } from 'react-router-dom';
import "./History.css"


const steps = [
  { title: 'Creado', description: 'solicitud creada correctamente, en espera de ser tomado por el área de TI'},
  { title: 'Revisión TI', description: 'El área de TI se encuentra gestionado su solicitud'},
  { title: 'Revisión KU', description: 'El área usuaria se encuentra gestionando su solicitud'},
  { title: 'Finalizado', description: 'Su solicitud se encuentra finalizada'},
];

const columns = [
  { 
    title: 'ID', 
    dataIndex: 'id', 
    key: 'id',
    render: (_, record) => (
      <Link to={`detail/${record.id}`}>{record.id}</Link>
    ),

  },
  { 
    title: 'Fecha Solicitud', 
    dataIndex: 'fechaSolicitud', 
    key: 'fechaSolicitud' 
  },
  { 
    title: 'Estado Solicitud', 
    dataIndex: 'estadoSolicitud', 
    key: 'estadoSolicitud' 
  },
  { 
    title: 'Módulo', 
    dataIndex: 'modulo', 
    key: 'modulo' 
  },
  { 
    title: 'Título', 
    dataIndex: 'titulo', 
    key: 'titulo' 
  },
  { 
    title: 'Estado', 
    dataIndex: 'estado', 
    key: 'estado',
    render: (_, record) => (
      <Steps 
        type="inline"
        current={record.current}
        status={record.status}
        items={steps}
        />
    ), 
  },
];

function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    async function getDataList() {
      try {
        const jsonCurrentUser = await sp_api_get_json("/_api/web/CurrentUser");
        console.log(jsonCurrentUser);
  
        const jsonRequests = await sp_api_get_json(`/sites/APPTICKETERA/_api/web/lists/getbytitle('Request')/items?$filter=correoSolicitante eq '${jsonCurrentUser.Email}'`);
        console.log(jsonRequests.results);
  
        const arrayAux = jsonRequests.results.map((request) => ({
          key: request.idSolicitud,
          id: request.idSolicitud,
          fechaSolicitud: request.fechaSolicitud,
          estadoSolicitud: request.estadoSolicitud,
          modulo: request.modulo,
          titulo: request.titulo,
          descripcion: request.descripcion,
          current: request.current,
          status: request.status, // "error" "wait" "finish" "error"
        }));
  
        setData(arrayAux);
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false);
      }
    }
  
    getDataList();
  }, []);


  return (
    <div className="history-container"> {/* Aplica una clase de estilo al contenedor principal */}
      <Spin spinning={loading}>
        <Table dataSource={data} columns={columns} bordered />
      </Spin>
    </div>
  );
};

export default History;




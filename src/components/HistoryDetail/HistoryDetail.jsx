import { Badge, Descriptions, Spin, Steps, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sp_api_get_json } from '../../api/sp_api_json';
import './HistoryDetail.css'
import FilesDetail from '../FilesDetails/FilesDetail';

const stepItems = [
  { title: 'Creado', description: 'Se recibe su solicitud. En espera de ser tomado por el equipo TI'},
  { title: 'Revisión TI', description: 'El equipo de TI se encuentra trabajando su solicitud'},
  { title: 'Revisión KU', description: 'El área usuaria respectiva se encuentra trabajando su solicitud'},
  { title: 'Respuesta Enviada', description: 'Su solicitud fue contestada'},
  { title: 'Finalizado', description: 'Su solicitud se encuentra en estado finalizado'},
];

function HistoryDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getDataList() {
      try {
        const jsonCurrentUser = await sp_api_get_json("/_api/web/CurrentUser");
        console.log(jsonCurrentUser);

        const jsonRequests = await sp_api_get_json(`/sites/APPTICKETERA/_api/web/lists/getbytitle('Request')/items?$filter=idSolicitud eq '${id}'`);
        console.log(jsonRequests.results);

        if (jsonRequests.results.length === 1) {
          const request = jsonRequests.results[0];

          if (request.correoSolicitante === jsonCurrentUser.Email) {
            const arrayAux = {
              key: request.idSolicitud,
              id: request.idSolicitud,
              fechaSolicitud: request.fechaSolicitud,
              estadoSolicitud: request.estadoSolicitud,
              modulo: request.modulo,
              titulo: request.titulo,
              descripcion: request.descripcion,
              current: request.current,
              status: request.status, // "error" "wait" "finish" "error"
            };
            setData(arrayAux);
          } else {
            // El correo del usuario actual no coincide con el correo del registro
            message.error("No tienes permiso para ver este registro.");
            navigate('/'); // Redirigir a la página principal u otra página de error
          }
        } else {
          // No se encontró el registro con el ID especificado
          message.error("Error al obtener los datos de la solicitud.");
          navigate('/'); // Redirigir a la página principal u otra página de error
        }
      } catch (error) {
        console.log("Error", error);
        message.error("Error al obtener los datos de la solicitud.");
        navigate('/'); // Redirigir a la página principal u otra página de error
      } finally {
        setLoading(false);
      }
    }

    getDataList();
  }, [id, navigate]);

  const descriptionItems = [
    { key: 'id', label: 'ID de Solicitud', children: data.id, span:3 },
    { key: 'titulo', label: 'Título', children: data.titulo, span: 3 },
    { key: 'estadoSolicitud', label: 'Estado de Solicitud', children: <Badge status="processing" text={data.estadoSolicitud}/>,span: 3},
    { key: 'fechaSolicitud', label: 'Fecha de Solicitud', children: data.fechaSolicitud, span: 3 },
    { key: 'modulo', label: 'Módulo', children: data.modulo, span:3 },
    { key: 'descripcion', label: 'Descripción', children: data.descripcion, span:3 },
    { key: 'archivos', label: 'Archivos', children: <FilesDetail itemId={id}></FilesDetail>, span:3 },
    // Agrega otras propiedades según sea necesario...
  ];

  return (
    <div className="history-detail-container">
      <Spin spinning={loading}>
        <div className="steps-container">
          <Steps current={data.current} status={data.status} items={stepItems} />
        </div>
      
      <div className="descriptions-container">
        <Descriptions
          title="Detalles de la Solicitud"
          bordered
          items={descriptionItems}
          style={{ marginTop: '20px' }}
        />
      </div>
      </Spin>

      
      
    </div>
    
  )
}

export default HistoryDetail;
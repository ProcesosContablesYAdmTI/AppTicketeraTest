import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Upload} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';
import { sp_api_contextInfo_json, sp_api_post_json, sp_api_post_json_file, sp_api_get_json, sp_api_update_json } from '../../api/sp_api_json';



function FormApp(){

  //CONSTANT
  const [form] = Form.useForm(); // Instancia del formulario
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [fileList, setFileList] = useState([]);
  const [modulo, setModulo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  //FUNCTION

  const onFinish = async () => {
    // Validar los campos antes de enviar
    await form.validateFields()
      .then(async () =>  {
        await handleSubmit(); // Si los campos son válidos, continuar con el envío del formulario
        setFileList([]); // Limpia los archivos seleccionados
        form.resetFields(); // Limpiar el formulario después del envío
        setIsModalVisible(true); // Mostrar el modal
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const handleChangeModulo = (value) => {
    console.log(`selected ${value}`);
    setModulo(value);
  };
  
  const onChangeTitulo = (e) => {
    console.log('Change:', e.target.value);
    setTitulo(e.target.value);
  };

  const onChangeDescripcion = (e) => {
    console.log('Change:', e.target.value);
    setDescripcion(e.target.value);
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };
  
  //USEEFFECT
  useEffect(() => {
    async function getCurrentUSer(){
      await sp_api_get_json("/_api/web/CurrentUser")
      .then(async json => {
        console.log(json)
        setCurrentUserEmail(json.Email)
      })
      .catch(err => {
        console.log("Error", err)
      })
    }
    getCurrentUSer()
  },[])
  
  const handleSubmit = async () => {
    try {
      const data = {
        Title: "Title",
        fechaSolicitud: new Date(),
        estadoSolicitud: "Creada",
        modulo,
        titulo,
        descripcion,
        correoSolicitante: currentUserEmail,
        current: 0,
        status: "process" // "process" "wait" "finish" "error"
      };
  
      const digest = await sp_api_contextInfo_json("/sites/APPTICKETERA/_api/contextinfo");
  
      const response = await sp_api_post_json("/sites/APPTICKETERA/_api/web/lists/getbytitle('Request')/items", digest, data);
  
      console.log(`OK POST CON ID REGISTRO: "${response.ID}"`);
  
      if (response.Id !== "") {
        for (let i = 0; i < fileList.length; i++) {
          const fileName = fileList[i].originFileObj.name;
          const reader = new FileReader();
  
          const fileDataPromise = new Promise((resolve, reject) => {
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
          });
  
          reader.readAsArrayBuffer(fileList[i].originFileObj);
          const fileData = await fileDataPromise;
  
          await sp_api_post_json_file(`/sites/APPTICKETERA/_api/web/lists/getbytitle('Request')/items('${response.Id}')/AttachmentFiles/add(FileName='${fileName}')`, digest, fileData);
  
          console.log(`OK CARGA ARCHIVO: ${i}`);
        }
  
        const dataId = {
          idSolicitud: `${String(response.Id)}002023`,
        };
  
        await sp_api_update_json(`/sites/APPTICKETERA/_api/web/lists/getbytitle('Request')/items('${response.Id}')`, digest, dataId);
  
        console.log("Se realizó correctamente la actualización");
      } else {
        throw new Error("Error al crear el registro");
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
      

  return(
    <>
      <Form
        name="basic"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 10 }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form} // Asigna la instancia del formulario
      >
      
      <Form.Item
          label="Módulo"
          name="modulo"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el módulo del caso',
            },
          ]}
        >

        <Select
              placeholder="Seleccione el módulo asociado al ticket"
              onChange={handleChangeModulo}
              value={modulo}
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese el módulo asociado',
                },
              ]}
              options={[
                {
                  value: 'CO',
                  label: 'Control de gestión',
                },
                {
                  value: 'GL',
                  label: 'Contabilidad',
                },
                {
                  value: 'TR',
                  label: 'Tesorería',
                },
                {
                  value: 'FICA',
                  label: 'Cuenta Corriente Alumno',
                },
              ]}
            />

      </Form.Item>

      
        <Form.Item
          label="Título"
          name="titulo"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa el título',
            },
          ]}
        >
          <Input
            placeholder="Ingrese el título del caso"
            showCount 
            maxLength={20}
            onChange={onChangeTitulo}
            value={titulo}
          />
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="descripcion"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa la descripción',
            },
          ]}
        >
          <TextArea
              showCount
              maxLength={350}
              style={{
                height: 200,
                resize: 'none',
              }}
              onChange={onChangeDescripcion}
              placeholder="Ingrese la descripción del caso"
              value={descripcion}
        />  

        </Form.Item>

        <Form.Item
            label="Adjuntos"
            name="adjunto"
            rules={[
              {
                required: true,
                message: 'Por favor cargar archivos adjuntos',
              },
            ]}

        >
          <Upload 
            multiple
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false} // Para prevenir la subida automática
          >
              <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

      </Form>

      <Modal
      title="Éxito"
      open={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
      >
      ¡El formulario se envió exitosamente!
      </Modal>

    </>
    

)};

export default FormApp;
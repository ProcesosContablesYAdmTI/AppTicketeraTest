import React, { useEffect, useState } from 'react'
import { Menu } from 'antd';
import { NavLink } from "react-router-dom"
import { sp_api_get_json } from '../../api/sp_api_json';



const items = [
  {
    label: (
        <NavLink to="/form">
            Form
        </NavLink>
    ),
    key: "form"
  },
  {
    label: (
      <NavLink to="/history">
          History
      </NavLink>
  ),
    key: "history"
  }, 
  {
    label: (
      <NavLink to="/chat">
          Chat
      </NavLink>
  ),
    key: "chat"
  }

]


function NavBar() {

  const [current, setCurrent] = useState("form");
  const [currentUserName, setCurrentUserName] = useState("");
  

  useEffect(() => {

    async function getCurrentUSer(){
      await sp_api_get_json("/_api/web/CurrentUser")
      .then(async json => {
        console.log(json)
        setCurrentUserName(json.Title)
      })
      .catch(err => {
        console.log("Error", err)
      })
    }

    getCurrentUSer()

  },[])



  const onClick = (e) => {
    // console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    // <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      {items.map(item => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
      <Menu.Item disabled style={{ marginLeft: 'auto', marginRight: '10px' }}>
        Current User: {currentUserName}
      </Menu.Item>
    </Menu>

  )
}

export default NavBar
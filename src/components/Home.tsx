import React, { useState } from 'react';
import {
  Link
} from "react-router-dom";
import { Table, Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { TypeListItem } from "../utils/Interfaces"
import 'antd/dist/antd.css';
import GetAllLists, { DeleteList, FirstIdAvaiable } from '../utils/StorageHelper';
import Column from 'antd/lib/table/Column';


//{date:new Date(),id:1,items:[],title:"Lista 1"}

function Home() {
  return <div>
    <h2>Listas</h2>
    <Lists />
  </div>;
}


function Lists() {
  const [data, setData] = useState(()=>{
    return GetAllLists().map(list=>{list.key = list.id.toString(); return list});
  });
  return <Table dataSource={data}
    footer={() =>
      <div style={{ textAlign: "center" }}>
        <Link to={{ pathname: FirstIdAvaiable(data.map(list=>list.id)).toString(), state:{newList:true}}}>
          Adicionar Nova Lista
        </Link>
      </div>}
  >
    <Column title="Nome" dataIndex="title" key="title" render={(value: any, record: TypeListItem) => <Link to={"/" + record.id}>{value}</Link>} />
    <Column title="Data" dataIndex="date" key="date" render={(value: any, record: TypeListItem) => <span> {new Date(record.date).toLocaleDateString("pt-BR")} </span>} />
    <Column title="" dataIndex="" key="actions" render={(value: any, record: TypeListItem) => <Button onClick={() => { DeleteList(record.id); setData(GetAllLists()) }} type="primary" shape="circle" icon={<DeleteFilled />} />} />
  </Table>

}

export default Home;

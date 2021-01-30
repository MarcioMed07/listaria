import { Button, Input, InputNumber, Table } from 'antd';
import { useReducer, useState } from 'react';
import { TypeItem, TypeListItem } from '../utils/Interfaces';
import { DeleteFilled } from '@ant-design/icons';
import { FirstIdAvaiable } from '../utils/StorageHelper';
import { Money } from 'bigint-money';

const { Column } = Table;


interface TypeItemsProps {
  list: TypeListItem,
  updateItems(items: TypeItem[], list: TypeListItem): TypeItem[]
}
export default function Items({ list, updateItems }: TypeItemsProps) {
  const reducer = (state: TypeItem[], action: TypeItem[]) =>{return updateItems(action, list)}
  const [items, dispatchItems] = useReducer(reducer, list.items)
  const [subtotal, updateSubtotal] = useState(fSubtotal())
  function findItem(id:number):TypeItem{
    return items[items.findIndex(i => i.id === id)]
  }
  function fSubtotal(){
    return items.reduce((acc,cur)=>cur.price.add(acc), new Money(0,"BRL")).toFixed(2)
  }
  return (
    <Table 
    size="small" 
    pagination={false} 
    dataSource={items} 
    title={
      ()=>(
        <span>
          SubTotal: {subtotal}
        </span>
      )
    }
    footer={() =>
      <div style={{ textAlign: "center" }}>
        <Button 
        type="link"
        onClick={()=>{
          const newitem:TypeItem = {
            id: FirstIdAvaiable(items.map(i=>i.id)),
            name:"",
            price:new Money(0,"BRL"),
            quantity:1,
            unity:""
          }
          dispatchItems([...items, newitem]);
        }} >
          Adicionar Novo Item
        </Button>
      </div>}
    >
      <Column title="Produto" dataIndex="name" key="name" render={(value, record: TypeItem) => (
        <Input 
          defaultValue = {value}
          onChange={(e) => {
            findItem(record.id).name = e.target.value;
            dispatchItems(items)
          }}/>
      )} />
      <Column title="Quantidade" dataIndex="quantity" key="quantity" render={(value, record: TypeItem) => (
        <InputNumber  
          defaultValue = {value}
          min={0} 
          step={0.1}
          onChange={(value) => {
            if(value){
              findItem(record.id).quantity = 
                typeof(value) === "string" ?
                parseInt(value, 10):
                value;
              dispatchItems(items)
            }
          }}/>
      )} />
      <Column title="Unidade" dataIndex="unity" key="unity" render={(value, record: TypeItem) => (
        <Input 
          defaultValue = {value}
          onChange={(e) => {
            findItem(record.id).unity = e.target.value;
            dispatchItems(items)
          }}/>
      )} />
      <Column title="Preço" dataIndex="price" key="price" render={(value:Money, record: TypeItem) => (
        <InputNumber  
          defaultValue = {Number.parseFloat(value.toFixed(2))}
          min={0} 
          step={0.01}
          onChange={(value) => {
            if(!value){
              return
            }
            let nValue = Number.parseFloat(value.toString())
            if(!Number.isNaN(nValue)){
              findItem(record.id).price = new Money(nValue.toString(), "BRL")
              dispatchItems(items)
              updateSubtotal(fSubtotal())
            }
            
          }}/>
      )} />
      <Column
        title="Ações"
        dataIndex="actions"
        key="actions"
        render={(value, record: TypeItem) => (
          <Button onClick={() => { dispatchItems(items.filter(i => i.id !== record.id)) }} type="primary" shape="circle" icon={<DeleteFilled />} />)}
      />
    </Table>
  )
}

/*
[{"date":"2021-01-12T03:18:34.754Z","id":1,"items":[{"id":1, "name":"Alho", "unity":"Kg", "quantity":1,"price":5.36}],"title":"Nova Lista"},
{"date":"2021-01-12T03:18:34.754Z","id":2,"items":[],"title":"Nova Lista"}]
*/
import React, { useState } from 'react';
import {
  Link, useLocation, useParams
} from "react-router-dom";
import { Input, Button, DatePicker, Tooltip,  Result } from 'antd';
import 'antd/dist/antd.css';
import { TypeItem, TypeListItem } from '../utils/Interfaces';
import { EditFilled, CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import Items from './Items';
import { GetList, UpdateList } from '../utils/StorageHelper';


interface TypeTitle { state: TypeListItem | undefined, dispatch: Function, id?: number, changeEditing?: Function }

function EditTitle({ state, dispatch, changeEditing }: TypeTitle) {
  return state && changeEditing ? <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>
      <Input value={state.title} onChange={(e) => dispatch({ ...state, title: e.target.value })}></Input>
      <DatePicker value={moment(state.date)} onChange={(e) => dispatch({ ...state, date: e?.toDate() })} />
    </span>
    <Tooltip title="Editar">
      <Button onClick={() => { UpdateList(state); changeEditing(false) }} type="primary" shape="circle" icon={<CheckOutlined />} />
    </Tooltip>
  </div> : <></>
}

function DisplayTitle({ state, dispatch, changeEditing }: TypeTitle) {
  return state && changeEditing ? <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>
      <h2>
        {state.title}
      </h2>
      <h4>{state.date.toDateString()}</h4>
    </span>
    <Tooltip title="Concluir">
      <Button onClick={() => changeEditing(true)} type="primary" shape="circle" icon={<EditFilled />} />
    </Tooltip>
  </div> : <></>
}
function Title({ state, dispatch, id }: TypeTitle) {
  const [editing, changeEditing] = useState(false)

  return editing ?
    <EditTitle state={state} dispatch={dispatch} changeEditing={changeEditing} /> :
    <DisplayTitle state={state} dispatch={dispatch} changeEditing={changeEditing} />;
}

function updateItems(items:TypeItem[], list:TypeListItem):TypeItem[]{
  list.items = items;
  UpdateList(list);
  return items;
}

export default function List(props: any) {
  let id = parseInt(useParams<{ id: string }>().id, 10);
  let locationState = useLocation<any>().state
  const [state, setState] = useState(() => {
    let list
    try {
      list = GetList(id, locationState?.newList)
    } catch (e) {
      console.error(e);
    }
    return list
  });
  return (
    state ?
    <>
      <Title state={state} dispatch={setState} id={id} />
      <Items list={state} updateItems={updateItems} />
    </> :
    <Result
      status="404"
      title="404"
      subTitle="Sinto muito, essa página não existe."
      extra={<Link to=""><Button type="primary">Voltar para o inicio</Button></Link>}
    />

  );
}
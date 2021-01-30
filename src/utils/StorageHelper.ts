import Money from "bigint-money";
import { TypeListItem } from "./Interfaces";

const ListFrame:TypeListItem = {"date":new Date(),"id":1,"items":[],"title":"Nova Lista"}

export default function GetAllLists():TypeListItem[]{
    let lists:any[] = JSON.parse(localStorage.getItem("lists")||"[]");
    lists.map(list=>{
        list.date = new Date(list.date)
        list.items.map((item:any)=>{
            item.price = new Money(item.price[0],item.price[1])
            return item
        })
        return list
    });
    return lists;
}

export function GetList(id:number, newList?:boolean):TypeListItem{
    const lists = GetAllLists()
    let list = lists.find(l=>l.id === id)
    if(!list) {
        if(!newList){
            throw new Error ("Not found");
        }
        list = ListFrame
        list.id = id;
        lists.push(list);
        UpdateAllLists(lists);
    }
    return list
}

function UpdateAllLists(lists:TypeListItem[]){
    localStorage.setItem("lists",JSON.stringify(lists));
}

export function UpdateList(list: TypeListItem){
    let lists = GetAllLists()
    let listToChangeId = lists.findIndex(l=>l.id === list.id)
    lists[listToChangeId] = list;
    UpdateAllLists(lists);
}

export function DeleteList(id: number){
    let lists = GetAllLists()
    let filtered = lists.filter(list=>list.id !== id)
    UpdateAllLists(filtered);
}

export function FirstIdAvaiable(ids:number[]):number{
    for(let id = 1; id < Number.MAX_SAFE_INTEGER; id++){
        if(!ids.find(i=>i === id)){
            return id
        }
    }
    return 0
}

//[{"date":"2021-01-11T19:22:34.212Z","id":1,"items":[],"title":"Lista 1"}]
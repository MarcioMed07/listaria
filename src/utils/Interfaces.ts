import {Money } from 'bigint-money';

export interface TypeListItem {
    title: string;
    date: Date;
    items: TypeItem[];
    id: number;
    key?:string;
}

export interface TypeItem {
    id: number,
    name: string;
    quantity: number;
    unity: string;
    price: Money;
}
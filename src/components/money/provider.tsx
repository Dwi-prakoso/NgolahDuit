import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { loadData, saveData, resetData, type MoneyData } from '@/lib/money';
type Store = { data: MoneyData | null; ready: boolean; error: string; update: (next: MoneyData) => boolean; reset: () => void; notify: (message: string) => void };
const Context=createContext<Store | null>(null);
export function MoneyProvider({children}:{children:ReactNode}) { const [data,setData]=useState<MoneyData|null>(null); const [ready,setReady]=useState(false); const [error,setError]=useState(''); const [message,setMessage]=useState('');
useEffect(()=>{ try {setData(loadData());} catch {setError('Data browser belum bisa dibaca. Impor backup lo atau mulai setup baru.');} setReady(true); },[]);
useEffect(()=>{if(!message)return; const timer=setTimeout(()=>setMessage(''),3500);return()=>clearTimeout(timer);},[message]);
const update=(next: MoneyData)=>{try{saveData(next);setData(next);setError('');return true;}catch{setMessage('Belum tersimpan. Penyimpanan browser penuh atau tidak tersedia.');return false;}};
const reset=()=>{try{resetData();setData(null);setError('');}catch{setMessage('Data belum bisa direset. Periksa pengaturan browser.');}};
return <Context.Provider value={{data,ready,error,update,reset,notify:setMessage}}>{children}{message&&<div className="money-toast" role="status">✓ {message}</div>}</Context.Provider>; }
export function useMoney(){const store=useContext(Context);if(!store)throw new Error('MoneyProvider missing');return store;}

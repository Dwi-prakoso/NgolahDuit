export type Transaction = { id: string; type: 'income' | 'expense'; amount: number; category: string; subcategory?: string; payment: string; date: string; note: string; obligationId?: string };
export type Installment = { id: string; name: string; amount: number; months: number; due: string; paidMonths: string[] };
export type FixedExpense = { id: string; name: string; amount: number; paidMonths: string[] };
export type Wish = { id: string; name: string; amount: number; priority: 'High' | 'Medium' | 'Low'; emoji: string; status: 'Wishlist' | 'Purchased' };
export type MoneyData = { version: 1; profile: { name: string; status: string; goal: string }; settings: { monthlyTarget: number; weeklyTarget: number; safePercent: number; warningThreshold: number }; openingBalance: number; transactions: Transaction[]; installments: Installment[]; fixedExpenses: FixedExpense[]; wishlist: Wish[] };
export const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
export const monthKey = (date = today()) => date.slice(0,7);
export const id = () => crypto.randomUUID();
export const rupiah = (n: number) => `Rp${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(n)}`;
export const monthName = () => new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date());
export function emptyData(): MoneyData { return { version:1, profile:{name:'', status:'Mahasiswa + Freelance', goal:''}, settings:{monthlyTarget:0, weeklyTarget:0, safePercent:10, warningThreshold:300000}, openingBalance:0, transactions:[], installments:[], fixedExpenses:[], wishlist:[] }; }
export function balance(data: MoneyData) { return data.openingBalance + data.transactions.reduce((s,t) => s + (t.type === 'income' ? t.amount : t.payment === 'PayLater' ? 0 : -t.amount),0); }
export function monthlyIncome(data: MoneyData, month = monthKey()) { return data.transactions.filter(t => t.type==='income' && monthKey(t.date)===month).reduce((s,t)=>s+t.amount,0); }
export function monthlySpending(data: MoneyData, month = monthKey()) { return data.transactions.filter(t=>t.type==='expense' && monthKey(t.date)===month).reduce((s,t)=>s+t.amount,0); }
export function weeklyIncome(data: MoneyData) { const now=new Date(); now.setHours(0,0,0,0); now.setDate(now.getDate() - (now.getDay()+6)%7); const end=new Date(now); end.setDate(end.getDate()+7); return data.transactions.filter(t=>t.type==='income' && new Date(`${t.date}T00:00:00`)>=now && new Date(`${t.date}T00:00:00`)<end).reduce((s,t)=>s+t.amount,0); }
export const isPaid = (data: MoneyData, obligationId: string, month=monthKey()) => data.transactions.some(t=>t.obligationId===obligationId && t.type==='expense' && monthKey(t.date)===month);
export function payLater(data: MoneyData, unpaidOnly = true) { return data.installments.filter(i=>i.months>0 && (!unpaidOnly || !isPaid(data,i.id))).reduce((s,i)=>s+i.amount,0); }
export function fixedTotal(data: MoneyData) { return data.fixedExpenses.filter(i=>!isPaid(data,i.id)).reduce((s,i)=>s+i.amount,0); }
export function safeMoney(data: MoneyData) { return balance(data)*data.settings.safePercent/100; }
export function availableSpending(data: MoneyData) { return balance(data)-payLater(data)-fixedTotal(data)-safeMoney(data); }
export function financialStatus(available: number, threshold: number): 'Safe' | 'Caution' | 'Risk' { return available<0 ? 'Risk' : available<=threshold ? 'Caution' : 'Safe'; }
export function purchaseImpact(data: MoneyData, amount: number) { return availableSpending(data)-amount*(1-data.settings.safePercent/100); }
const STORAGE_KEY='moneyTracker';
const finite = (v: unknown) => typeof v==='number' && Number.isFinite(v) && v>=0;
const text = (v: unknown) => typeof v==='string';
const dateValid = (v: unknown) => text(v) && /^\d{4}-\d{2}-\d{2}$/.test(String(v)) && !Number.isNaN(Date.parse(String(v)));
export function validateBackup(value: unknown): MoneyData { const d = value as MoneyData; if (!d || d.version!==1 || !d.profile || !text(d.profile.name) || !d.profile.name.trim() || !text(d.profile.status) || !text(d.profile.goal) || !d.settings || !finite(d.openingBalance) || !finite(d.settings.monthlyTarget) || !finite(d.settings.weeklyTarget) || !finite(d.settings.safePercent) || d.settings.safePercent>100 || !finite(d.settings.warningThreshold) || !Array.isArray(d.transactions) || !Array.isArray(d.installments) || !Array.isArray(d.fixedExpenses) || !Array.isArray(d.wishlist)) throw new Error('Backup file isn’t valid.');
if (d.transactions.some(t=>!t || !text(t.id) || !finite(t.amount) || t.amount===0 || !['income','expense'].includes(t.type) || !text(t.category) || !text(t.payment) || !dateValid(t.date) || !text(t.note) || (t.obligationId!==undefined && !text(t.obligationId))) || d.installments.some(i=>!i || !text(i.id) || !text(i.name) || !finite(i.amount) || !Number.isInteger(i.months) || i.months<0 || !dateValid(i.due) || !Array.isArray(i.paidMonths)) || d.fixedExpenses.some(i=>!i || !text(i.id) || !text(i.name) || !finite(i.amount) || !Array.isArray(i.paidMonths)) || d.wishlist.some(w=>!w || !text(w.id) || !text(w.name) || !finite(w.amount) || !text(w.emoji) || !['High','Medium','Low'].includes(w.priority) || !['Wishlist','Purchased'].includes(w.status)) || balance(d)<0) throw new Error('Backup file isn’t valid.');
const ids=[...d.transactions,...d.installments,...d.fixedExpenses,...d.wishlist].map(x=>x.id); if(new Set(ids).size!==ids.length) throw new Error('Backup file isn’t valid.'); return d; }
export function loadData(): MoneyData | null { const raw=localStorage.getItem(STORAGE_KEY); return raw ? validateBackup(JSON.parse(raw)) : null; }
export function saveData(data: MoneyData) { localStorage.setItem(STORAGE_KEY,JSON.stringify(data)); }
export function resetData() { localStorage.removeItem(STORAGE_KEY); }
export function exportData(data: MoneyData) { const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})); const a=document.createElement('a'); a.href=url; a.download='money-tracker-backup.json'; a.click(); URL.revokeObjectURL(url); }
export async function importData(file: File) { return validateBackup(JSON.parse(await file.text())); }
export function changeTransaction(data: MoneyData, transaction: Transaction): MoneyData { const next={...data,transactions:[...data.transactions.filter(t=>t.id!==transaction.id),transaction]}; if(balance(next)<0) throw new Error('Saldo lo nggak bisa di bawah Rp0.'); return next; }

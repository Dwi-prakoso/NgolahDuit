import { createFileRoute } from '@tanstack/react-router';
import { TransactionsPage } from '@/components/money/pages';
import { moneyHead } from '@/lib/metadata';
export const Route = createFileRoute('/transactions')({ head:()=>moneyHead('Transaction history','Cari dan kelola semua catatan pemasukan dan pengeluaran lo.'),component:()=><TransactionsPage/> });

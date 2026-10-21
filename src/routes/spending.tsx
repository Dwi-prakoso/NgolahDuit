import { createFileRoute } from '@tanstack/react-router';
import { TransactionsPage } from '@/components/money/pages';
import { moneyHead } from '@/lib/metadata';
export const Route = createFileRoute('/spending')({ head:()=>moneyHead('Your spending','Lihat pengeluaran per kategori dan catat transaksi tanpa judgment.'),component:()=><TransactionsPage type="expense"/> });

import { createFileRoute } from '@tanstack/react-router';
import { TransactionsPage } from '@/components/money/pages';
import { moneyHead } from '@/lib/metadata';
export const Route = createFileRoute('/income')({ head:()=>moneyHead('Your income','Pantau income bulanan, sumber pemasukan, dan progres target mingguan lo.'),component:()=><TransactionsPage type="income"/> });

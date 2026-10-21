import { createFileRoute } from '@tanstack/react-router';
import { PayLaterPage } from '@/components/money/pages';
import { moneyHead } from '@/lib/metadata';
export const Route = createFileRoute('/paylater')({ head:()=>moneyHead('Your PayLater','Pantau cicilan, jatuh tempo, dan pembayaran PayLater tanpa kejutan.'),component:()=><PayLaterPage/> });

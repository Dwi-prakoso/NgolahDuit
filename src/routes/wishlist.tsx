import { createFileRoute } from '@tanstack/react-router';
import { WishlistPage } from '@/components/money/pages';
import { moneyHead } from '@/lib/metadata';
export const Route = createFileRoute('/wishlist')({ head:()=>moneyHead('Your wishlist','Rencanakan wishlist dan lihat dampak pembelian pada ruang spending lo.'),component:()=><WishlistPage/> });

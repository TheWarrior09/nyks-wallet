import type { ReactElement } from 'react';
import { RegisterBitcoinAddress } from 'src/components/RegisterBitcoinAddress';
import { BasicLayout } from 'src/layouts';

export default function BtcWalletPage() {
  return <RegisterBitcoinAddress />;
}

BtcWalletPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

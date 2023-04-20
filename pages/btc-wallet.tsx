import type { ReactElement } from 'react';
import { BtcWallet } from 'src/modules/BtcWallet';
import { BasicLayout } from 'src/layouts';

export default function BtcWalletPage() {
  return <BtcWallet />;
}

BtcWalletPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

import type { ReactElement } from 'react';
import { BtcBridge } from 'src/components/BtcBridge';
import { BasicLayout } from 'src/layouts';

export default function BtcWalletPage() {
  return <BtcBridge />;
}

BtcWalletPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

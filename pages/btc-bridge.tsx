import type { ReactElement } from 'react';
import { BtcBridge } from 'src/modules/BtcBridge';
import { BasicLayout } from 'src/layouts';

export default function BtcWalletPage() {
  return <BtcBridge />;
}

BtcWalletPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

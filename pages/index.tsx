import Head from 'next/head';
import { ReactElement } from 'react';
import { BasicLayout } from 'src/layouts';

export default function Home() {
  return (
    <>
      <Head>
        <title>Nyks Wallet</title>
        <meta name="description" content="Nyks wallet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <p>Get started with twilight.</p>
          <p>WIP</p>
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

import Head from 'next/head';

const Header = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content='Created by Francis Castro' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default Header;

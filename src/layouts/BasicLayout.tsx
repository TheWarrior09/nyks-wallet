import Navbar from 'src/layouts/Navbar';

export default function BasicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

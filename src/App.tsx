import Illustration from './components/illustration';
import PassGenerator from './components/pass-generator';

export default function App() {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-blue-50">
      <section className="grid gap-5 max-w-7xl grid-cols-1 md:grid-cols-2 p-5 md:p-10">
        <Illustration />
        <PassGenerator />
      </section>
    </main>
  );
}

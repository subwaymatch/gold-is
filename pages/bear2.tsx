import { useBearStore } from 'bear-store';
import Link from 'next/link';

function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}

export default function BearPage() {
  return (
    <>
      <h1>Bear 2</h1>
      <BearCounter />
      <Controls />
      <Link href="/bear">
        <a>To Bear 1</a>
      </Link>
    </>
  );
}

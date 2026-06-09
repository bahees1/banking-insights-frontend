import SingleStat from "@/components/SingleStat";

export default function Test() {
  return (
    <main className="min-h-screen flex flex-col items-center mt-30"> 
        <SingleStat title="Total Income" amount={1234567890} />
    </main>
  );
    
}
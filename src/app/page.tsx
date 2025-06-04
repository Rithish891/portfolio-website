import { MainNavigation } from "@/components/MainNavigation";

export default function Home() {
  return (
    <main className="min-h-screen">
      <MainNavigation />
      <div className="container mx-auto pt-24 px-6">
        {/* Your sections will go here */}
        <section id="home" className="h-screen flex items-center">
          <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
        </section>
      </div>
    </main>
  );
}

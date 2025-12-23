import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <h1 className="sr-only">Calculator App</h1>
      
      <Calculator />
      
      <p className="mt-8 text-muted-foreground text-sm animate-fade-in">
        Built with React & Tailwind
      </p>
    </main>
  );
};

export default Index;

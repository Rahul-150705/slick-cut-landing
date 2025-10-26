const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-2xl px-4">
        <h1 className="mb-4 text-5xl font-extrabold text-foreground">
          Welcome to <span className="text-primary">California Barber Shop</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Experience premium grooming with a modern touch.  
          At <strong>California Barber Shop</strong>, every cut is crafted to perfection.
        </p>
        <p className="text-lg text-muted-foreground">
          Explore our services, book your appointment, and step into a world of style and confidence.
        </p>
      </div>
    </div>
  );
};

export default Index;

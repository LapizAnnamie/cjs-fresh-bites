const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto bg-customVeryLightPink">
      <div className="mx-auto h-full w-full">{children}</div>
    </main>
  );
};

export default HomeLayout;

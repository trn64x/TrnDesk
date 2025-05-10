type BarbuttonProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  };
  
  const Barbutton = ({ children, ...props }: BarbuttonProps) => {
    return (
      <div
        role="button"
        tabIndex={0}
        {...props}

        className="cursor-pointer flex items-center p-2 m-1 rounded-md max-w h-20 font-light bg-background text-foreground hover:bg-secondary/90  transition-colors duration-200"
      >
        {children}
      </div>
    );
  };
  export default Barbutton;
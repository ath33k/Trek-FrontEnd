export default function Container({ children, className }) {
  const classes = `transition-[max-width] duration-1000 sm:max-w-[600px] sm:mx-auto md:max-w-[700px] lg:max-w-[818px] xl:max-w-[1024px] 2xl:max-w-[1100px] ${className}`;
  return <div className={classes}>{children}</div>;
}

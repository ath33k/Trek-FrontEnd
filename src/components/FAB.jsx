/* eslint-disable react/prop-types */

export default function FAB({ children, className, onClick }) {
  return (
    <button onClick={onClick} type="button" className={className}>
      {children}
    </button>
  );
}

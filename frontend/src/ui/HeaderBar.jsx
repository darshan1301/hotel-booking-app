// eslint-disable-next-line react/prop-types
const HeaderBar = ({ children }) => {
  return (
    <div className="mx-2 my-2 flex flex-row-reverse items-center justify-between rounded-full border border-stone-200 shadow-sm">
      {children}
    </div>
  );
};

export default HeaderBar;

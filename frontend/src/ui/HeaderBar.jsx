// eslint-disable-next-line react/prop-types
const HeaderBar = ({ children }) => {
  return (
    <div className="mx-2 my-2 flex flex-row-reverse items-center justify-between rounded-full shadow-sm">
      {children}
    </div>
  );
};

export default HeaderBar;

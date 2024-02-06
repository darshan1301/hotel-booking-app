// eslint-disable-next-line react/prop-types
const InputBar = ({ label, type, onChange, name, value }) => {
  const defaultValue = value ?? "";
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
    // console.log(e);
  };

  const styles = {
    label: "flex-1 text-sm capitalize font-bold text-gray-700",
    input:
      "w-full rounded-full border border-stone-400 px-2 py-1 mt-2 font-normal",
  };

  return (
    <div>
      {label && <label className="mb-1 block text-sm font-bold">{label}</label>}
      <input
        type={type}
        className={styles.input}
        onChange={(e) => handleChange(e)}
        name={name}
        value={defaultValue}
      />
    </div>
  );
};

export default InputBar;

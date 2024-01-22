/* eslint-disable react/prop-types */
const Facilities = ({ facilities }) => {
  return (
    <div className="mt-2  block divide-stone-500 rounded-xl border border-stone-200 px-2 py-3 text-left text-xs font-medium uppercase text-stone-700 shadow-sm">
      <ol className="flex flex-wrap">
        {facilities.map((item) => (
          <li className="flex-shrink-0 px-1" key={item}>
            {item},
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Facilities;

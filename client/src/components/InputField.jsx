const InputField = ({ type = "text", placeholder, value, onChange, name }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:bg-white"
    />
  );
};

export default InputField;

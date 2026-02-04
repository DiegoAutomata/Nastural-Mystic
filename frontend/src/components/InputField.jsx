export default function InputField({ label, type, placeholder, value, onChange, error }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <input
                type={type}
                className={`w-full px-4 py-3 rounded-xl bg-slate-800 border ${error ? 'border-red-500' : 'border-slate-700'} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-white outline-none transition-all`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

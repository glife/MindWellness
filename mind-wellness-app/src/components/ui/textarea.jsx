export function Textarea({ value, onChange, placeholder, className = "" }) {
  return (
      <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4} // Ensures visibility
          className={`w-full p-2 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
      />
  );
}

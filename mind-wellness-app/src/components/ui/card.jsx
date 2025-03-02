// src/components/ui/card.jsx
export function Card({ children }) {
    return (
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
        {children}
      </div>
    );
  }
  
  export function CardContent({ children }) {
    return <div className="p-2">{children}</div>;
  }
  
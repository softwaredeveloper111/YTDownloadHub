
const Loader = ({ size = 'md', color = 'blue', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    purple: 'border-purple-500',
    gray: 'border-gray-500'
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="relative">
        <div
          className={`animate-spin rounded-full border-4 border-transparent ${colorClasses[color]} border-t-current ${sizeClasses[size]}`}
        ></div>
        <div
          className={`absolute top-0 left-0 animate-spin rounded-full border-4 border-transparent ${colorClasses[color]} border-b-current ${sizeClasses[size]} animation-delay-75`}
          style={{ animationDelay: '0.1s' }}
        ></div>
      </div>
      {text && <p className="text-gray-600 text-sm font-medium">{text}</p>}
    </div>
  );
};

export default Loader;
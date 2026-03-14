export default function SkeletonLoader(){

return(

<div className="glass p-6 rounded-3xl flex flex-col md:flex-row gap-8 animate-pulse">

  <div className="flex flex-col gap-4 md:w-2/5">
    <div className="bg-gray-700 h-56 rounded-xl" />
    <div className="bg-gray-700 h-6 w-3/4 rounded" />
    <div className="bg-gray-700 h-4 w-1/2 rounded" />
  </div>

  <div className="flex-1 bg-white/10 border border-white/10 rounded-2xl p-4">
    <div className="flex gap-2 mb-4">
      <div className="bg-gray-700 h-10 w-24 rounded-xl" />
      <div className="bg-gray-700 h-10 w-24 rounded-xl" />
    </div>

    <div className="space-y-3">
      <div className="bg-gray-700 h-10 rounded-lg" />
      <div className="bg-gray-700 h-10 rounded-lg" />
      <div className="bg-gray-700 h-10 rounded-lg" />
    </div>
  </div>

</div>

);
}
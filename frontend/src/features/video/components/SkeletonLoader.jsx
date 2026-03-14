export default function SkeletonLoader(){

return(

<div className="glass p-6 rounded-3xl flex flex-col md:flex-row gap-6 animate-pulse">

<div className="bg-gray-700 h-44 w-full md:w-80 rounded-xl"/>

<div className="flex-grow space-y-4">

<div className="bg-gray-700 h-6 w-3/4 rounded"/>
<div className="bg-gray-700 h-4 w-1/4 rounded"/>

<div className="flex gap-3">
<div className="bg-gray-700 h-10 w-20 rounded"/>
<div className="bg-gray-700 h-10 w-20 rounded"/>
<div className="bg-gray-700 h-10 w-20 rounded"/>
</div>

</div>

</div>

);
}
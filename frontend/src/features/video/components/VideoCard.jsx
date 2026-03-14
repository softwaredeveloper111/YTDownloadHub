export default function VideoCard() {
  return (
    <div className="glass rounded-3xl p-6 flex flex-col md:flex-row gap-8 mt-10">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold"></h2>
          <p className="text-purple-400"></p>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2">VIDEO</p>

          <div className="flex flex-wrap gap-3"></div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2">AUDIO</p>
        </div>
      </div>
    </div>
  );
}

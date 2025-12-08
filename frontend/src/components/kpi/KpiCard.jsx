

const KpiCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white rounded-xl border-[1.5px] border-gray-300/60 px-4 py-3 min-w-[180px]">

      <div className="flex items-center gap-1 mb-1">
        <p className="text-[13px] text-gray-700 font-medium">{title}</p>

        <div className="w-4 h-4 rounded-full border border-gray-400/70 flex items-center justify-center">
          <span className="text-[11px] text-gray-600 font-semibold">!</span>
        </div>
      </div>

      <p className="text-[15px] font-extrabold text-gray-900 tracking-tight">
        {value}{" "}
        {subtitle && (
          <span className="font-extrabold text-gray-900">
            ({subtitle})
          </span>
        )}
      </p>

    </div>
  );
};

export default KpiCard;
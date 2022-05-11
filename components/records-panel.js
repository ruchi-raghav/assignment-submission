export default function RecordsPanel({ data, selectedRecordIndex, action }) {
  return (
    <div className="h-full w-full border border-slate-900 bg-white">
      <div className="w-full h-14 text-center font-bold bg-blue-700 text-3xl text-white py-3">
        Records
      </div>

      <div className="overflow-y-auto">
        {data &&
          data.map((record, index) => {
            return (
              <div
                key={`record-${index}`}
                className={`w-full h-14 align-middle text-base py-5 border-b border-b-slate-900 truncate px-2 ${
                  index === selectedRecordIndex ? "bg-white" : "bg-blue-100"
                }`}
                onClick={() => action(index)}
              >
                {record.index}. {record.text}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default function AnnotationList({ annotations, onDelete }) {
  return (
    <div className="h-full w-full border border-slate-900 bg-white">
      <div className="w-full h-16 text-center font-bold bg-blue-700 align-middle text-3xl text-white py-3">
        Records
      </div>
      <div>
        {annotations &&
          annotations.map((annotation, index) => {
            return (
              <div
                key={`annotation-${index}`}
                className="flex mx-4 gap-4 items-center"
              >
                <div className="w-2/3 truncate">{annotation.selection}</div>
                <div className="w-1/3 flex justify-between items-center">
                  <div className="font-semibold capitalize">
                    {annotation.type}
                  </div>
                  <div className="text-2xl" onClick={() => onDelete(index)}>
                    &times;
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

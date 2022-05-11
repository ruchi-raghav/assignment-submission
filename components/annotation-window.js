import { AnnotationType } from '../pages';

export default function AnnotationWindow({
  record,
  selectedAnnotationType,
  setSelectedAnnotationType,
  onSelect,
}) {
  const isPersonTypeSelected = selectedAnnotationType === AnnotationType.PERSON;

  return (
    <div className="h-full w-full border border-slate-900 bg-white">
      <div className="w-full h-14 bg-blue-700 text-base flex  px-3 gap-4">
        <button
          className={`px-2 font-semibold rounded bg-white my-3 ${
            isPersonTypeSelected ? "" : "bg-blue-700 border text-white"
          }`}
          onClick={() => setSelectedAnnotationType(AnnotationType.PERSON)}
        >
          PERSON
          <span className="text-xs ml-1">1</span>
        </button>

        <button
          className={`px-2 font-semibold rounded bg-white my-3 ${
            isPersonTypeSelected ? "bg-blue-700 border text-white" : ""
          }`}
          onClick={() => setSelectedAnnotationType(AnnotationType.ORG)}
        >
          ORG
          <span className="text-xs ml-1">2</span>
        </button>
      </div>
      <div className="m-2" onMouseUp={() => onSelect()}>
        {record}
      </div>
    </div>
  );
}

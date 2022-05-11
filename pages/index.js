import { useState } from 'react';

import AnnotationList from '../components/annotation-list';
import AnnotationWindow from '../components/annotation-window';
import RecordsPanel from '../components/records-panel';

export const AnnotationType = {
  PERSON: "person",
  ORG: "org",
};

export default function Home() {
  let records;

  const [selectedRecordIndex, setSelectedRecordIndex] = useState(0);
  const [selectedAnnotationType, setSelectedAnnotationType] = useState(
    AnnotationType.PERSON
  );
  const [annotations, setAnnotations] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const isCSR = typeof window !== "undefined";

  if (isCSR) {
    const dataFromLocalStorage = window.localStorage.getItem("data");
    records = JSON.parse(dataFromLocalStorage);

    if (isFirstLoad) {
      console.log(getAnnotationsFromLocal());
      setAnnotations(getAnnotationsFromLocal());
      setIsFirstLoad(false);
    }
  }

  function setSelectedRecord(value) {
    setSelectedRecordIndex(value);
    setAnnotations(getAnnotationsFromLocal(`annotations-${value}`));
  }

  function saveSelectionToLocalStorage() {
    const selection = window.getSelection().toString();

    if (selection) {
      const parsedAnnotations = getAnnotationsFromLocal() ?? [];

      parsedAnnotations.push({
        type: selectedAnnotationType,
        selection: selection,
      });

      setAnnotations(parsedAnnotations);
      window.localStorage.setItem(getKey(), JSON.stringify(parsedAnnotations));
    }
  }

  function deleteAnnotation(index) {
    const newAnnotations = [...annotations];
    newAnnotations.splice(index, 1);
    setAnnotations(newAnnotations);
    window.localStorage.setItem(getKey(), JSON.stringify(newAnnotations));
  }

  function getAnnotationsFromLocal(key) {
    const annotationsFromLocalStorage = window.localStorage.getItem(
      key ?? getKey()
    );
    const parsedAnnotations = JSON.parse(annotationsFromLocalStorage);

    return parsedAnnotations;
  }

  function getKey() {
    return `annotations-${selectedRecordIndex}`;
  }

  return (
    <div className="h-screen grid grid-cols-4 bg-slate-100 pt-4">
      <div className="col-span-1 pl-4 pr-2">
        <RecordsPanel
          data={records}
          selectedRecordIndex={selectedRecordIndex}
          action={setSelectedRecord}
        />
      </div>
      <div className="col-span-2 px-2">
        {isCSR && (
          <AnnotationWindow
            record={records[selectedRecordIndex].text}
            selectedAnnotationType={selectedAnnotationType}
            setSelectedAnnotationType={setSelectedAnnotationType}
            onSelect={saveSelectionToLocalStorage}
          />
        )}
      </div>
      <div className="col-span-1 pl-2 pr-4">
        <AnnotationList annotations={annotations} onDelete={deleteAnnotation} />
      </div>
    </div>
  );
}

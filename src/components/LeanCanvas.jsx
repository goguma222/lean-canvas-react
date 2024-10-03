import CanvasCard from './CanvasCard';

export default function LeanCanvas({ canvas, onCanvasChange }) {
  // notes 컴포넌트 적용할 이벤트 핸들러
  // 1. notes에 변경이 일어났을 때 실행
  // 2. 기존 (인자 canvas) 캔버스에서 변경된 notes ( updatedNotes )를 변경한 후
  // 3. 다시 부모 컴포넌트 ( onCanvasChange )로 보내주면 된다.
  const handleNotesChange = (section, updatedNotes) => {
    const updatedCanvas = {
      ...canvas,
      [section]: { ...canvas[section], notes: updatedNotes },
    };
    onCanvasChange(updatedCanvas);
  };

  return (
    <div className="border-4 border-black">
      <div className="grid grid-cols-5">
        <CanvasCard
          title={'1. 문제'}
          notes={canvas.problem?.notes}
          onNotesChange={notes => handleNotesChange('problem', notes)}
        />
        <CanvasCard
          title={'4.해결안'}
          notes={canvas.solution?.notes}
          onNotesChange={notes => handleNotesChange('solution', notes)}
        />
        <CanvasCard
          title={'3.가치제안'}
          notes={canvas.valueProposition?.notes}
          onNotesChange={notes => handleNotesChange('valueProposition', notes)}
        />
        <CanvasCard
          title={'5.경쟁우위'}
          notes={canvas.unfairAdvantage?.notes}
          onNotesChange={notes => handleNotesChange('unfairAdvantage', notes)}
        />
        <CanvasCard
          title={'2.목표고객'}
          notes={canvas.customerSegments?.notes}
          onNotesChange={notes => handleNotesChange('customerSegments', notes)}
        />
        <CanvasCard
          title={'기존대안'}
          isSubTitle
          notes={canvas.existingAlternatives?.notes}
          onNotesChange={notes =>
            handleNotesChange('existingAlternatives', notes)
          }
        />
        <CanvasCard
          title={'8.핵심지표'}
          notes={canvas.costStructure?.notes}
          onNotesChange={notes => handleNotesChange('costStructure', notes)}
        />
        <CanvasCard
          title={'상위개념'}
          isSubTitle
          notes={canvas.highLevelConcept?.notes}
          onNotesChange={notes => handleNotesChange('highLevelConcept', notes)}
        />
        <CanvasCard
          title={'9.고객경로'}
          notes={canvas.revenueStreams?.notes}
          onNotesChange={notes => handleNotesChange('revenueStreams', notes)}
        />
        <CanvasCard
          title={'얼리어답터'}
          isSubTitle
          notes={canvas.earlyAdopters?.notes}
          onNotesChange={notes => handleNotesChange('earlyAdopters', notes)}
        />
      </div>
      <div className="grid grid-cols-2">
        <CanvasCard
          title={'7.비용구조'}
          notes={canvas.keyMetrics?.notes}
          onNotesChange={notes => handleNotesChange('keyMetrics', notes)}
        />
        <CanvasCard
          title={'6.수익흐름'}
          notes={canvas.channels?.notes}
          onNotesChange={notes => handleNotesChange('channels', notes)}
        />
      </div>
    </div>
  );
}

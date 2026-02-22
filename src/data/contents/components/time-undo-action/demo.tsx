

import { TimedUndoAction } from '.';

function TimedUndoActionDemo() {
  return (
    <TimedUndoAction
      initialSeconds={10}
      deleteLabel="Delete Account"
      undoLabel="Cancel Deletion"
    />
  );
}

export default TimedUndoActionDemo;

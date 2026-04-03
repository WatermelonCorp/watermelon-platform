

import { TimedUndoAction } from './base';

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

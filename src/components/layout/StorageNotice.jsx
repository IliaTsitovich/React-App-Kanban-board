import { useEffect } from 'react';
import { toast } from 'sonner';
import { takeUnreadableDataFlag } from '../../lib/storage';

// Render after <Toaster />: its effect has to subscribe before this one fires.
export function StorageNotice() {
  useEffect(() => {
    if (takeUnreadableDataFlag()) {
      toast.error("Some saved data was unreadable and wasn't loaded.", { duration: 10000 });
    }
  }, []);
  return null;
}

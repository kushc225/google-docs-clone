import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs';
import { Id } from '../../../../convex/_generated/dataModel';
import { useRef, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from 'sonner';
import { useStatus } from '@liveblocks/react';
import { LoaderIcon } from 'lucide-react';

interface DocumentInputProps {
  title: string;
  id: Id<'documents'>;
}
export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const [value, setValue] = useState(title);
   const status = useStatus()
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.updateById);

  const debounceUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return true;
    setIsPending(true);

    mutate({ id, title: newValue })
      .then(() => toast.success('document updated'))
      .catch(() => toast.error('something went wrong'))
      .finally(() => setIsPending(false));
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounceUpdate(newValue);
  };

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(false);

    mutate({ id, title: value })
    .then(() => {toast.success('document updated'); setIsEditing(false)})
    .catch(() => toast.error('something went wrong'))
    .finally(() => setIsPending(false));
  }

  const showLoader = isPending || status === "connecting" || status === "reconnecting"
  const showError = status === "disconnected"
  return (
    <div className="flex items-center gap-2 ">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">{value || ''}</span>
          <input
            type="text"
            ref={inputRef}
            onChange={onChange}
            onBlur={() => {
               setIsEditing(false);
            }}
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate "
        >
          {title}
        </span>
      )}

      {showError && <BsCloudSlash className="size-4" />}
      {!showError && !showLoader && (
         <BsCloudCheck className="text-green-500 size-4" />
      )}

      {showLoader && <LoaderIcon className="animate-spin text-muted-foreground size-4" />}

      
    </div>
  );
};

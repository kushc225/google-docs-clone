import { TableCell, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Building2Icon, CircleUserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { SiGoogledocs } from 'react-icons/si';
import { Doc } from '../../../convex/_generated/dataModel';
import { DocumentMenu } from './document-menu';

interface DocumentRowProps {
  document: Doc<'documents'>;
}
export const DocumentRow: FC<DocumentRowProps> = ({ document }) => {
  const router = useRouter();
  const onRowClick = (id: string) => {
    router.push(`/documents/${id}`);
  };
  const onNewTabClick = (id: string) => {
    window.open(`/document/${id}`, '_blank');
  };
  return (
    <TableRow className="cursor-pointer" onClick={() => onRowClick(document._id)}>
      <TableCell className="w-[50px]">
        <SiGoogledocs className="fill-blue-500 size-6" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md md:flex items-center gap-2 ">
        {document.organizationId ? <Building2Icon className="size-4" /> : <CircleUserIcon className="size-4" />}
        {document.organizationId ? 'Organization' : 'Personal'}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md md:table-cell ">
        {format(new Date(document._creationTime), 'MMM dd, yyyy')}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu documentId={document._id} title={document.title} onNewTab={onNewTabClick} />
      </TableCell>
    </TableRow>
  );
};

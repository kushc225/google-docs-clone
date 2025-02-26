'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { templates } from '@/cosntants/template';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { api } from '../../../convex/_generated/api';
import { useState } from 'react';


export const TemplatesGallery = () => {
  const router = useRouter();
  const create = useMutation(api.documents.create); 
  const [isCreating, setIsCreating] = useState(false)

  const onTemplateClick = async (title: string, initialContent: string) => {
    try {
      setIsCreating(true);
  
      const documentId = await create({ title, initialContent });
      router.push(`/documents/${documentId}`);
    } catch (error) {
      console.error("Error creating document:", error);
    } finally {
      setIsCreating(false);
    }
  };
  
  return (
    <div className="bg-[#F1F3F4]">
      <div className="max-w-screen-xl mx-auto py-6 px-16 flex flex-col gap-y-4">
        <h3 className="font-medium">Start a new Document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714285714286%] pl-4"
              >
                <div
                  className={cn('aspect-[3/4] flex flex-col gap-y-2.5', isCreating && 'pointer-events-none opacity-0')}
                >
                  <button
                    disabled={isCreating}
                    onClick={() => onTemplateClick(template.label, "")}
                    style={{
                      backgroundImage: `url(${template.imgUrl})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col jsutcify-center items-center bg-white gap-y-4"
                  />
                  <p className="text-sm truncate font-medium">{template.label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

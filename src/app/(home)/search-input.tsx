'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParams } from '@/hooks/use-search-params';
import { SearchIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';

export const SearchInput = () => {
  const [value, setValue] = useState('');
  const [searchParams , setSearchParams] = useSearchParams("search")
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => { 
    setValue('');
    inputRef.current?.blur()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setSearchParams(value);
      inputRef.current?.blur()
  }
  console.log(searchParams)
  return (
    <div className="flex-1 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="relative max-w-[720px] w-full">
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="md:text-base outline-none border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3), 0_1px_3px_1px_rgba(65,69,73,0.15)]  px-12 bg-[#f0f4f8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white w-full"
        />
        <Button
          type="submit"
          variant="ghost"
          size={'icon'}
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>

        {value && (
          <Button
            onClick={handleClear}
            type="button"
            variant="ghost"
            size={'icon'}
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
};

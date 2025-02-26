import { LoaderIcon } from 'lucide-react'
import React from 'react'
interface FullScreenLoaderProps { 
    label? : string,
}
const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({label}) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-2'>
        <LoaderIcon className='size-6 text-muted-foreground animate-spin'/>
        {label && <span className='text-sm text-muted-foreground'>{label}</span>}
    </div>
  )
}

export default FullScreenLoader
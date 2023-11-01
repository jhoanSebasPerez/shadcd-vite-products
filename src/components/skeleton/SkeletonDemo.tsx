import { Skeleton } from '../ui/skeleton';

export function SkeletonDemo(){
    return (
        <div className="w-full my-3 flex gap-3">
            <Skeleton className="w-full h-8" />
        </div>
    )
}
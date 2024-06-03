import Image from "next/image"


function PodcastCard({ title, description, imgURL, podcastId }: {
    imgURL: string,
    title: string,
    description: string,
    podcastId: number
}) {
    return (
        <div className='cursor-pointer'>
            <figure className='flex flex-col gap-2'>
                <Image
                    src={imgURL}
                    width={176}
                    height={176}
                    alt={title}
                    className='rounded-xl aspect-square h-fit w-full'
                />
                <div className="flex flex-col">
                    <h1 className='text-16 truncate font-bold text-white-1'>{title}</h1>
                    <h2 className='text-12 truncate font-normal capitalize text-white-4'>{description}</h2>
                </div>
            </figure>
        </div>
    )
}

export default PodcastCard
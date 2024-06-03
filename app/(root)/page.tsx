import PodcastCard from '@/components/PodcastCard'
import { podcastData } from '@/constants'
import React from 'react'

function Home() {
  return (
    <div className="">
      <section className="flex flex-col gap-8">
        <h1 className="text-20 font-bold text-white-1">The Future of Radio Streaming</h1>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-center justify-center gap-12">
          {podcastData.map(({ id, title, description, imgURL }) => (
            <PodcastCard
              key={id}
              title={title}
              description={description}
              imgURL={imgURL}
              podcastId={id}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
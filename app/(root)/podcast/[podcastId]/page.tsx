import React from 'react'

function PodcastDetailsPage({params}: {params: {podcastId: string}}) {
  return (
    <div>PodcastDetailsPage {params.podcastId}</div>
  )
}

export default PodcastDetailsPage
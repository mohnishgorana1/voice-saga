import { useParams } from 'next/navigation'
import React from 'react'

function ProfilePage({params}: {params: {profileId: string}}) {
  return (
    <div>ProfilePage {params.profileId}</div>
  )
}

export default ProfilePage
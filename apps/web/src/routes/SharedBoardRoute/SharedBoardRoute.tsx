import { useParams } from 'react-router'
import { SharedBoardContainer } from './components'
import { useClient } from '@/hooks'
import { useQuery } from '@tanstack/react-query'

export function SharedBoardRoute () {
  const params = useParams<{ token?: string }>()
  const client = useClient()
  const getSharedBoard = useQuery({
    queryKey: ['getSharedBoardByToken', params.token],
    queryFn: () => client.getSharedBoardByToken({ token: params.token! }),
    enabled: Boolean(params.token)
  })
  const sharedBoard = getSharedBoard.data

  return (
    <>
      {sharedBoard && <SharedBoardContainer sharedBoard={sharedBoard} />}
    </>
  )
}

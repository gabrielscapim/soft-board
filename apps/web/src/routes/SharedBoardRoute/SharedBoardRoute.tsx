import { useParams } from 'react-router'
import { SharedBoardContainer, SharedBoardErrorContainer } from './components'
import { useClient } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { Client } from '@/client'
import { Spinner } from '@/components/ui/spinner'

export function SharedBoardRoute () {
  const params = useParams<{ token?: string }>()
  const client = useClient()
  const getSharedBoard = useQuery({
    queryKey: ['getSharedBoardByToken', params.token],
    queryFn: () => client.getSharedBoardByToken({ token: params.token! }),
    enabled: Boolean(params.token),
    retry: false
  })
  const sharedBoard = getSharedBoard.data

  return (
    <div className="h-screen w-full">
      {true && (
        <div className="flex flex-col items-center justify-center h-full">
          <Spinner variant="circle" />
        </div>
      )}
      {getSharedBoard.isError && (
        <SharedBoardErrorContainer
          isNotFound={Client.isNotFound(getSharedBoard.error)}
        />
      )}
      {sharedBoard && (
        <SharedBoardContainer sharedBoard={sharedBoard} />
      )}
    </div>
  )
}

import { useAuthentication, useBoard, useClient, useMemberRole, useMessages, useRequirements } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useState } from 'react'
import { GetMessagesResultData, GetRequirementsResultData, UpdateRequirementCommand } from 'types/endpoints'
import { RequirementsContainer, DeleteRequirementDialog, EditRequirementDialog } from './components'
import { ChatContainer } from '../ChatContainer'

export function RequirementsWizard () {
  const { board } = useBoard()
  const boardId = board?.id
  const client = useClient()
  const { authenticatedUser } = useAuthentication()
  const getMessages = useMessages(boardId)
  const getRequirements = useRequirements(boardId)
  const memberRole = useMemberRole()

  const [sendingMessage, setSendingMessage] = useState<string | null>(null)
  const [requirementToDelete, setRequiredToDelete] = useState<GetRequirementsResultData | null>(null)
  const [requirementToEdit, setRequirementToEdit] = useState<GetRequirementsResultData | null>(null)

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      setSendingMessage(content)
      return await client.sendMessage({ boardId: boardId!, content })
    },
    onError: (error: any) => toast.error(error?.response?.data?.detail ?? 'Failed to send message'),
    onSuccess: async (result) => {
      await getMessages.refetch()

      const actionTools = ['create_requirement', 'update_requirement_by_id', 'delete_requirement_by_id']
      const hasRequirementAction = result.messages.some(message => (
        message.toolCalls?.some(({ function: { name } }) => actionTools.includes(name))
      ))

      if (hasRequirementAction) {
        getRequirements.refetch()
        toast.success('Requirements updated by the assistant')
      }
    },
    onSettled: () => setSendingMessage(null)
  })
  const createRequirement = useMutation({
    mutationFn: () => client.createRequirement({ boardId: boardId! }),
    onError: (error: any) => toast.error(error?.response?.data?.detail ?? 'Failed to create requirement'),
    onSuccess: () => {
      toast.success('Requirement created successfully')
      getRequirements.refetch()
    }
  })
  const updateRequirement = useMutation({
    mutationFn: (data: UpdateRequirementCommand) => client.updateRequirement(data),
    onError: (error: any) => toast.error(error?.response?.data?.detail ?? 'Failed to update requirement'),
    onSuccess: () => {
      toast.success('Requirement updated successfully')
      getRequirements.refetch()
      setRequirementToEdit(null)
    }
  })
  const deleteRequirement = useMutation({
    mutationFn: (requirementId: string) => client.deleteRequirement({ id: requirementId, boardId: boardId! }),
    onError: (error: any) => toast.error(error?.response?.data?.detail ?? 'Failed to delete requirement'),
    onSuccess: () => {
      getRequirements.refetch()
      toast.success('Requirement deleted successfully')
      setRequiredToDelete(null)
    }
  })

  const messages = getMessages.messages
  const requirements = getRequirements.requirements

  return (
    <>
      <div className="w-8/12 bg-card flex flex-col h-full border-r text-sm">
        {board && (
          <ChatContainer
            board={board}
            hasPermission={memberRole !== 'member'}
            authenticatedUser={authenticatedUser}
            loading={sendMessage.isPending}
            messages={
              sendingMessage
                ? [
                    ...messages,
                    {
                      id: 'preview',
                      content: sendingMessage,
                      author: authenticatedUser,
                      role: 'user',
                      toolCallId: null,
                      toolCalled: false
                    } as GetMessagesResultData
                  ]
                : messages
              }
              onSendMessage={content => sendMessage.mutate(content)}
            />
          )
        }
      </div>

      <div className="w-4/12 p-4 overflow-auto scrollbar">
        <RequirementsContainer
          hasPermission={memberRole !== 'member'}
          requirements={requirements}
          loading={createRequirement.isPending || deleteRequirement.isPending || updateRequirement.isPending}
          handleCreate={() => createRequirement.mutate()}
          handleDelete={requirement => setRequiredToDelete(requirement)}
          handleEdit={requirement => setRequirementToEdit(requirement)}
        />
      </div>

      {requirementToDelete && (
        <DeleteRequirementDialog
          open={Boolean(requirementToDelete)}
          isMutating={deleteRequirement.isPending}
          onCancel={() => setRequiredToDelete(null)}
          onConfirm={() => deleteRequirement.mutate(requirementToDelete.id)}
        />
      )}

      {requirementToEdit && (
        <EditRequirementDialog
          requirement={requirementToEdit}
          open={Boolean(requirementToEdit)}
          isMutating={updateRequirement.isPending}
          onCancel={() => setRequirementToEdit(null)}
          onConfirm={(title, description) => {
            updateRequirement.mutate({
              id: requirementToEdit.id,
              boardId: boardId!,
              title,
              description
            })
          }}
        />
      )}
    </>
  )
}

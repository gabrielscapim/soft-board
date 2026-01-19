import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCheck, Copy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { useTranslation } from 'react-i18next'

export type ShareBoardDialogProps = {
  open?: boolean
  sharedLink?: string | null
  isMutating?: boolean
  onShare?: () => void
  onClose?: () => void
}

export function ShareBoardDialog (props: ShareBoardDialogProps) {
  const { open, onClose } = props

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContentWrapper {...props} />
    </Dialog>
  )
}

function DialogContentWrapper (props: ShareBoardDialogProps) {
  const { sharedLink, isMutating, onShare, onClose } = props

  const [copied, setCopied] = useState(false)
  const { t } = useTranslation('routes.boardWizard')

  function handleCopy () {
    if (!sharedLink) return
    navigator.clipboard.writeText(sharedLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t('shareBoardDialog.title')}</DialogTitle>
        <DialogDescription className="hidden">
          {t('shareBoardDialog.description')}
        </DialogDescription>
      </DialogHeader>

      <Card className="border-dashed shadow-none">
        <CardContent className="flex flex-col items-center justify-center gap-3 text-center w-full">
          <div className="text-sm font-medium">
            {!sharedLink && t('shareBoardDialog.status.unshared.title')}
            {sharedLink && t('shareBoardDialog.status.shared.title')}
          </div>

          <p className="text-sm text-muted-foreground">
            {!sharedLink && t('shareBoardDialog.status.unshared.description')}
            {sharedLink && t('shareBoardDialog.status.shared.description')}
          </p>

          {sharedLink && (
            <div className="flex w-full max-w-sm items-center gap-2">
              <Input
                readOnly
                className="bg-muted/40"
                value={sharedLink}
              />

              <Button
                size="sm"
                variant="outline"
                disabled={copied || isMutating}
                onClick={handleCopy}
              >
                {copied ? <CheckCheck /> : <Copy />}
              </Button>
            </div>
          )}

          {!sharedLink && (
            <Button
              size="sm"
              className="mt-2"
              variant="ghost"
              disabled={isMutating}
              onClick={onShare}
            >
              {isMutating && <Spinner variant="circle" />}
              {t('actions.generateShareLink')}
            </Button>
          )}
        </CardContent>
      </Card>

      <DialogFooter>
        <Button
          variant="outline"
          disabled={isMutating}
          onClick={onClose}
        >
          {t('common:close')}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

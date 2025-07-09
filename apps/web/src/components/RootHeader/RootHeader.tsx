import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

export type RootHeaderProps = {
  title: string
}

export function RootHeader (props: RootHeaderProps) {
  const { title } = props

  return (
    <header className="bg-background sticky top-0 shrink-0 border-b p-2.5 z-50">
      <div className="flex w-full items-center">
        <SidebarTrigger className="m-0" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  )
}

import { SidebarTrigger } from '@/components/ui/sidebar'
import { NavUser } from './nav-user'
import { Separator } from '@/components/ui/separator'

const data = {
  user: {
    name: "John Doe",
    role: "admin",
    avatar: "/avatars/shadcn.jpg",
  },
}

export default function AppNav() {
  return (
    <header className="flex px-4 h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b mb-6">
        <div className="flex items-center gap-2 w-fit">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h2 className='font-semibold'>Dashboard</h2>
        </div>

        <NavUser user={data.user} />
      </header>
  )
}

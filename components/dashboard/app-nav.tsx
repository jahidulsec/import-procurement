import React from 'react'
import { Separator } from '../ui/separator'
import { SidebarTrigger } from '../ui/sidebar'
import { NavUser } from './nav-user'

const data = {
  user: {
    name: "John Doe",
    role: "admin",
    avatar: "/avatars/shadcn.jpg",
  },
}

export default function AppNav() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between w-full gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b mb-6">
        <div className="flex items-center gap-2 px-4 w-fit">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </div>

        <NavUser user={data.user} />
      </header>
  )
}

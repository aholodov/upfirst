import { type PropsWithChildren } from 'react'
import { PanelLeft } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import MainMenuUiFragment from '@/components/main-menu-ui-fragment.tsx'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-[240px] flex-col gap-2 justify-between border-r bg-background sm:flex px-4 pb-2 pt-[53px] overflow-y-auto">
        <MainMenuUiFragment />
      </aside>

      <div className="flex flex-col flex-1 gap-y-4 sm:pl-[240px]">
        <header className="flex sticky top-0 z-30 border-b bg-background px-4 sm:px-6 py-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />

                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col gap-2 sm:max-w-xs">
              <SheetTitle>Menu</SheetTitle>

              <div className="flex flex-1 flex-col gap-2 justify-between overflow-y-auto">
                <MainMenuUiFragment />
              </div>
            </SheetContent>
          </Sheet>

          <div className="ml-auto">
            <Button>
              Header button
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>

        <footer className="flex sticky bottom-0 z-30 border-t bg-background px-4 sm:px-6 py-2">
          <a href="#" className={buttonVariants({ className: 'mx-auto' })}>
            help center
          </a>
        </footer>
      </div>
    </div>
  )
}

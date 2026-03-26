import { Button } from "./components/ui/button"

export const App = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Hello auth frontend app!
      </h1>
      <Button variant={'destructive'}>Click me</Button>
    </div>
  )
}

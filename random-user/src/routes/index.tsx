import { createFileRoute } from '@tanstack/react-router'
import Homepage from './Homepage'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return <Homepage />
}
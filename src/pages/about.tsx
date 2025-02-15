import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  console.log('страничка о нас')
  return (
    <div>
      <h2>Страничка О НАС</h2>
    </div>
  )
}

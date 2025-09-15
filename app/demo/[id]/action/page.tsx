export default function ActionPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Action Page for {params.id}</h1>
      <p className="text-xl">This is a placeholder page for the {params.id} action button.</p>
      <a href="/learning-experience" className="mt-8 text-blue-500 hover:underline">
        Back to Learning Experience
      </a>
    </div>
  )
}

export function EndWizard () {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full gap-8">
      <h1 className="text-5xl font-bold">End of the Board</h1>
      <p className="text-md text-muted-foreground">
        Thank you for completing all the steps of the <strong>StartFlow</strong> method! You now have a low-fidelity MVP ready to present, test, and refine.
      </p>
    </div>
  )
}

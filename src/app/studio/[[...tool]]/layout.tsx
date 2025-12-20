export const metadata = {
  title: 'Admin Studio - Field Service Playbook',
  description: 'Content management for Field Service Playbook',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}

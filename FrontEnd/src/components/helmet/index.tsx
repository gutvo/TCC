import { Helmet } from 'react-helmet'

interface helmetTitleProps {
  label: string
}

export function HelmetTitle({ label }: helmetTitleProps) {
  return (
    <Helmet>
      <title>{label}</title>
    </Helmet>
  )
}

import * as SimpleIcons from 'simple-icons'

interface TechLogoProps {
  name: string
  className?: string
}

const iconNameMap: Record<string, string> = {
  'AWS': 'siAwsamazonwebservices',
  'Python': 'siPython',
  'React': 'siReact',
  'TypeScript': 'siTypescript',
  'Docker': 'siDocker',
  'Terraform': 'siTerraform',
  'PostgreSQL': 'siPostgresql',
  'Airflow': 'siApacheairflow',
  'dbt': 'siDbt',
  'FastAPI': 'siFastapi',
  'Redshift': 'siAwsamazonwebservices', // Using AWS logo for Redshift
}

export default function TechLogo({ name, className = '' }: TechLogoProps) {
  const iconName = iconNameMap[name]

  if (!iconName) {
    return null
  }

  // Access icon from SimpleIcons using bracket notation
  const icon = (SimpleIcons as any)[iconName]

  if (!icon) {
    return null
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  )
}

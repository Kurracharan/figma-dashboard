type IconName =
  | 'grid'
  | 'chart'
  | 'bag'
  | 'users'
  | 'settings'
  | 'help'
  | 'search'
  | 'bell'
  | 'calendar'
  | 'download'
  | 'arrow-up'
  | 'arrow-down'
  | 'more'
  | 'wallet'
  | 'orders'
  | 'credit-card'

interface IconProps {
  name: IconName
  size?: number
}

function Icon({ name, size = 18 }: IconProps) {
  const paths: Record<IconName, string> = {
    grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
    chart: 'M4 19V5M4 19h17M8 15l3-4 3 2 5-7',
    bag: 'M5 8h14l1 12H4L5 8zM8 8a4 4 0 0 1 8 0',
    users: 'M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 11a3 3 0 1 0 0-6M17 15h1a4 4 0 0 1 4 4v1',
    settings: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.5v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8.1 15a1.7 1.7 0 0 0-1.5-1H6.5v-2.5h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.1H15v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V14h-.1a1.7 1.7 0 0 0-1.5 1z',
    help: 'M9.5 9a2.5 2.5 0 1 1 4.4 1.6c-.9 1-1.9 1.3-1.9 2.9M12 17h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
    search: 'm20 20-4.5-4.5M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z',
    bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',
    calendar: 'M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2zM8 2v4M16 2v4M3 10h18',
    download: 'M12 3v12M7 10l5 5 5-5M4 21h16',
    'arrow-up': 'M5 15l6-6 4 4 4-6M15 7h4v4',
    'arrow-down': 'M5 9l6 6 4-4 4 6M15 17h4v-4',
    more: 'M5 12h.01M12 12h.01M19 12h.01',
    wallet: 'M3 7a2 2 0 0 1 2-2h14v14H5a2 2 0 0 1-2-2V7zM3 8h18v4h-5a2 2 0 0 1 0-4h5M16 10h.01',
    orders: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5',
    'credit-card': 'M3 6h18v12H3zM3 10h18M7 15h3',
  }

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d={paths[name]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

export default Icon

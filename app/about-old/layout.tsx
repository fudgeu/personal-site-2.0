import Navbar from '../components/navbar/navbar'
import styles from './layout_styles.module.css'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className={styles.main}>
      <Navbar />
      {children}
    </main>
  )
}

'use client';
import DiceGame from "@/components/DiceGame/DiceGame"
import styles from './page.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <DiceGame />
    </div>

  )
}

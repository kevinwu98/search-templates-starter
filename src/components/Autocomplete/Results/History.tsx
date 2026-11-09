import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import HistoryItem from "../Item/HistoryItem"
import Heading from "@/elements/Heading/Heading"
import styles from "./History.module.css"
import { texts } from "@/config"

export default function History() {
  const historyItems = useNostoAppState(state => state.historyItems)

  if (!historyItems) {
    return null
  }

  return (
    <div className={styles.historyColumn}>
      <Heading>{texts.recentSearches}</Heading>
      {historyItems.map(item => (
        <HistoryItem key={item} item={item} />
      ))}
    </div>
  )
}

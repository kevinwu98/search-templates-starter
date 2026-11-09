import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import styles from "./NoResults.module.css"
import { texts } from "@/config"

export default function NoResults() {
  const query = useNostoAppState(state => state.response.query)

  return (
    <div className={styles.container}>
      <div>{texts.noResults(query)}</div>
    </div>
  )
}

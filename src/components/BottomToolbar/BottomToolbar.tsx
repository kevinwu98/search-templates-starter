import { useSizeOptions } from "@nosto/search-js/preact/hooks"
import { defaultSize, sizes, texts } from "@/config"
import Pagination from "@/components/Pagination/Pagination"
import Select from "@/elements/Select/Select"
import styles from "./BottomToolbar.module.css"

export default function BottomToolbar() {
  const { size, handleSizeChange, sizeOptions } = useSizeOptions(sizes, defaultSize)
  const options = sizeOptions.map(v => ({ value: v, label: texts.itemsPerPageOption(v) }))

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Pagination />
        {options.length > 0 && (
          <Select
            value={size}
            onChange={e => handleSizeChange(Number((e.target as HTMLSelectElement)?.value))}
            options={options}
            label={texts.itemsPerPage}
          />
        )}
      </div>
    </div>
  )
}

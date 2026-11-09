import { useCallback } from "preact/hooks"
import { useProductFilters } from "@nosto/search-js/preact/hooks"
import Button from "@/elements/Button/Button"
import { texts } from "@/config"

export default function ClearFiltersButton() {
  const { filters, removeAll } = useProductFilters()

  const handleClearFilters = useCallback(() => {
    removeAll()
  }, [removeAll])

  if (filters.length === 0) {
    return null
  }

  return (
    <Button
      onClick={handleClearFilters}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClearFilters()
        }
      }}
      aria-label={texts.clearAllFilters}
      type="button"
    >
      {texts.clearFilters}
    </Button>
  )
}

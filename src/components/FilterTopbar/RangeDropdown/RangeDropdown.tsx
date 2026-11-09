import { useState, useRef, useEffect } from "preact/hooks"
import { useRange } from "@nosto/search-js/preact/hooks"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import FilterTrigger from "../FilterTrigger/FilterTrigger"
import RangeInput from "@/elements/RangeInput/RangeInput"
import Button from "@/elements/Button/Button"
import styles from "./RangeDropdown.module.css"
import { texts } from "@/config"

type Props = {
  facet: SearchStatsFacet
}

export default function RangeDropdown({ facet }: Props) {
  const { min, max, range, updateRange } = useRange(facet.id)
  const [isOpen, setIsOpen] = useState(false)
  const [localMin, setLocalMin] = useState(range[0])
  const [localMax, setLocalMax] = useState(range[1])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Update local values when range changes
  useEffect(() => {
    setLocalMin(range[0])
    setLocalMax(range[1])
  }, [range])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggleDropdown()
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  const applyFilter = () => {
    const clampedMin = Math.max(min, Math.min(localMin, max))
    const clampedMax = Math.max(min, Math.min(localMax, max))
    const newMin = Math.min(clampedMin, clampedMax)
    const newMax = Math.max(clampedMin, clampedMax)

    updateRange([newMin, newMax])
    setIsOpen(false)
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <FilterTrigger
        value={facet.name}
        isOpen={isOpen}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        ariaLabel={texts.filterBy(facet.name)}
      />

      {isOpen && (
        <div className={styles.menu} role="menu">
          <div className={styles.inputs}>
            <div className={styles.inputGroup}>
              <span className={styles.inputLabel}>$</span>
              <RangeInput
                value={localMin}
                min={min}
                max={max}
                placeholder={texts.rangeFrom}
                onChange={e => setLocalMin(Number(e.currentTarget.value))}
                className={styles.input}
                aria-label={texts.minimum(facet.name)}
              />
            </div>
            <div className={styles.inputGroup}>
              <span className={styles.inputLabel}>$</span>
              <RangeInput
                value={localMax}
                min={min}
                max={max}
                placeholder={texts.rangeTo}
                onChange={e => setLocalMax(Number(e.currentTarget.value))}
                className={styles.input}
                aria-label={texts.maximum(facet.name)}
              />
            </div>
          </div>
          <div className={styles.actions}>
            <Button onClick={applyFilter}>{texts.apply}</Button>
          </div>
        </div>
      )}
    </div>
  )
}

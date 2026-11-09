import { usePagination, useActions, Page } from "@nosto/search-js/preact/hooks"
import Icon from "@/elements/Icon/Icon"
import { JSX } from "preact/jsx-runtime"
import styles from "./Pagination.module.css"
import { getPageUrl } from "@/mapping/url/getPageUrl"
import { cl } from "@nosto/search-js/utils"
import { texts } from "@/config"

type Props = {
  ariaLabel?: string
} & JSX.IntrinsicElements["a"]

function PageLink({ onClick, href, className, ariaLabel, children }: Props) {
  return (
    <a className={cl(styles.link, className)} href={href} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </a>
  )
}

export default function Pagination() {
  const { prev, first, pages, last, next } = usePagination({
    width: 5
  })

  const { updateSearch } = useActions()

  function pageLinkProps({ from, page }: Page) {
    return {
      href: getPageUrl(page),
      onClick: (e: Event) => {
        e.preventDefault()
        updateSearch({ products: { from } })
        scrollTo(0, 0)
      }
    }
  }

  return (
    <ul className={styles.container}>
      {prev && (
        <li>
          <PageLink {...pageLinkProps(prev)} ariaLabel={texts.previousPage}>
            <Icon name="arrow-left" />
          </PageLink>
        </li>
      )}

      {first && (
        <>
          <li>
            <PageLink {...pageLinkProps(first)} ariaLabel={texts.firstPage}>
              {first.page}
            </PageLink>
          </li>
          <li>
            <span className={styles.filler}>...</span>
          </li>
        </>
      )}

      {pages.map(page => (
        <li key={page.page} className={cl(page.current && styles.active)}>
          <PageLink ariaLabel={texts.page(page.page)} {...pageLinkProps(page)}>
            {page.page}
          </PageLink>
        </li>
      ))}

      {last && (
        <>
          <li>
            <span className={styles.filler}>...</span>
          </li>
          <li>
            <PageLink {...pageLinkProps(last)} ariaLabel={texts.lastPage}>
              {last.page}
            </PageLink>
          </li>
        </>
      )}

      {next && (
        <li>
          <PageLink {...pageLinkProps(next)} ariaLabel={texts.nextPage}>
            <Icon name="arrow-right" />
          </PageLink>
        </li>
      )}
    </ul>
  )
}

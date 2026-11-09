import { SearchProducts } from "@nosto/nosto-js/client"
import Button from "@/elements/Button/Button"
import Heading from "@/elements/Heading/Heading"
import Product from "@/components/Autocomplete/Item/Product"
import styles from "./Results.module.css"
import { texts } from "@/config"

export type ProductsProps = {
  products: SearchProducts
}

export default function Products({ products }: ProductsProps) {
  if (!products?.hits?.length) {
    return null
  }

  return (
    <div className={styles.productsColumn}>
      <Heading>{texts.products}</Heading>
      <div className={styles.products}>
        {products.hits.map(hit => (
          <Product key={hit.productId} hit={hit} />
        ))}
      </div>
      <div className={styles.button}>
        <Button type="submit" className={styles.submit}>
          {texts.seeAllResults}
        </Button>
      </div>
    </div>
  )
}

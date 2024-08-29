import React from 'react';
import styles from '../styles/ProductTable.module.css';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  description: string;
  productCategory: string;
  price: number;
  imageUrl: string;
}

const ProductTable: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableCell + ' ' + styles.tableHead}>ID</th>
            <th className={styles.tableCell + ' ' + styles.tableHead}>Image</th>
            <th className={styles.tableCell + ' ' + styles.tableHead}>Name</th>
            <th className={styles.tableCell + ' ' + styles.tableHead}>Price</th>
            <th className={styles.tableCell + ' ' + styles.tableHead}>
              Description
            </th>
            <th className={styles.tableCell + ' ' + styles.tableHead}>
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className={styles.tableCell}>{product._id}</td>
              <td className={styles.tableCell}>
                <Image
                  loader={() => product.imageUrl}
                  src={product.imageUrl}
                  alt="No image"
                  width={100}
                  height={100}
                />
              </td>
              <td className={styles.tableCell}>{product.name}</td>
              <td className={styles.tableCell}>{product.price}</td>
              <td className={styles.tableCell}>{product.description}</td>
              <td className={styles.tableCell}>{product.productCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

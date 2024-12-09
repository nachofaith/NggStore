import type { Schema, Struct } from '@strapi/strapi';

export interface ProductProduct extends Struct.ComponentSchema {
  collectionName: 'components_product_products';
  info: {
    description: '';
    displayName: 'product';
  };
  attributes: {
    idProd: Schema.Attribute.String;
    name: Schema.Attribute.String;
    price: Schema.Attribute.Integer;
    quantity: Schema.Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.product': ProductProduct;
    }
  }
}

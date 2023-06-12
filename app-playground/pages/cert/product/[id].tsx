import {
  getProduct,
  // getProducts,
  GetProduct,
} from '#/lib/page-directory/get-products';
import { Product } from '#/ui/page-directory/product';
import { Reviews } from '#/ui/page-directory/reviews';
import { SimilarProducts } from '#/ui/page-directory/similar-products';
import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
  InferGetStaticPropsType,
} from 'next';

// ====================
// 1. Static Data (SSG)
// ====================

// Provide a list of products to pre-render at build time
export const getStaticPaths: GetStaticPaths = async () => {

  const products = [
  {
    "id": "1",
    "stock": 2,
    "rating": 5,
    "image": "eniko-kis-KsLPTsYaqIQ-unsplash.jpg",
    "imageBlur": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAqgAwAEAAAAAQAAAAoAAAAA/8AAEQgACgAKAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAf/aAAwDAQACEQMRAD8A+3/HPx10jQPE0+k6ZrPh6TTtKsbi41R7nVUiu7WeMkQxi2H3lk2su4sCrjBHFd54c+InhvxJ4e0vxFa3aRw6pawXSKxG5VnQOAfcA81474z8G+ENU1OeXU9Dsbt/N8zdNbRSHfn72WU/N79a9U03TtPj061jjtYkRIkAARQAAowAMV2Sa7GsIH//2Q==",
    "name": "Donec sit elit",
    "price": {
      "amount": 4200,
      "currency": {
        "code": "USD",
        "base": 10,
        "exponent": 2
      },
      "scale": 2
    },
    "isBestSeller": false,
    "leadTime": 2,
    "discount": {
      "percent": 90,
      "expires": 1
    },
    "description": "Morbi eu ullamcorper urna, a condimentum massa. In fermentum ante non turpis cursus fringilla. Praesent neque eros, gravida vel ante sed, vehicula elementum orci. Sed eu ipsum eget enim mattis mollis."
  },
  {
    "id": "2",
    "stock": 5,
    "rating": 4,
    "name": "Fusce commodo porta posuere",
    "image": "patrick-OIFgeLnjwrM-unsplash.jpg",
    "imageBlur": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAqgAwAEAAAAAQAAAAoAAAAA/8AAEQgACgAKAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAf/aAAwDAQACEQMRAD8AwNV+KvwHs7vSNLi8faJoy2VtcQatFLaSz3X2shBGyuUKjy23kgKwY4HStq5j0O4uZZ9Lfz7KR2aCQArviJyjYIyMrg4NXY7Cxddz20bE9SUU/wBKfsQcBQAPav6Gyrh+vQq1pyxMpKTuk+mr0Wr7/gf568TeI2DxlDDUqWXwpumrNpr3tIq7tFa6X67n/9k=",
    "price": {
      "amount": 4600,
      "currency": {
        "code": "USD",
        "base": 10,
        "exponent": 2
      },
      "scale": 2
    },
    "isBestSeller": false,
    "leadTime": 1,
    "description": "Morbi eu ullamcorper urna, a condimentum massa. In fermentum ante non turpis cursus fringilla. Praesent neque eros, gravida vel ante sed, vehicula elementum orci. Sed eu ipsum eget enim mattis mollis."
  },
  {
    "id": "3",
    "stock": 3,
    "rating": 3,
    "image": "yoann-siloine-_T4w3JDm6ug-unsplash.jpg",
    "imageBlur": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAqgAwAEAAAAAQAAAAoAAAAA/8AAEQgACgAKAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAf/aAAwDAQACEQMRAD8A+6vG/wC1t4J+GniLxP4L1Wynub7RrqWOQBJ1DvLbG9AVxC6ECHPO4DdhM7yBX2XpP2iTSrOROFaGMgegKivPPEGnafLrEckttE7yOu4siktgdzjmvTE4RQOAAKDSx//Z",
    "name": "Praesent tincidunt lectus",
    "price": {
      "amount": 29200,
      "currency": {
        "code": "USD",
        "base": 10,
        "exponent": 2
      },
      "scale": 2
    },
    "discount": {
      "percent": 70,
      "expires": 7
    },
    "isBestSeller": true,
    "leadTime": 2,
    "description": "Morbi eu ullamcorper urna, a condimentum massa. In fermentum ante non turpis cursus fringilla. Praesent neque eros, gravida vel ante sed, vehicula elementum orci. Sed eu ipsum eget enim mattis mollis."
  },
  {
    "id": "4",
    "stock": 2,
    "rating": 5,
    "image": "alexander-andrews-brAkTCdnhW8-unsplash.jpg",
    "imageBlur": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAqgAwAEAAAAAQAAAAoAAAAA/8AAEQgACgAKAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAf/aAAwDAQACEQMRAD8Ay59W0U20sUGmapJf2hZZVR7TyWVbd5hKgd1k2yOohVeu4jHGTXBwa9PcQR3BhaAyqG8uQ/Om4Z2tjjI6HHGa2dVtrad3aeJJCOhZQf51TjACKAMAAV0u99z8bni6E4RUaVmt3fc//9k=",
    "name": "Morbi at viverra turpis",
    "price": {
      "amount": 21200,
      "currency": {
        "code": "USD",
        "base": 10,
        "exponent": 2
      },
      "scale": 2
    },
    "isBestSeller": false,
    "leadTime": 2,
    "description": "Morbi eu ullamcorper urna, a condimentum massa. In fermentum ante non turpis cursus fringilla. Praesent neque eros, gravida vel ante sed, vehicula elementum orci. Sed eu ipsum eget enim mattis mollis."
  },
  {
    "id": "5",
    "stock": 1,
    "rating": 4,
    "image": "guillaume-coupy-6HuoHgK7FN8-unsplash.jpg",
    "imageBlur": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAqgAwAEAAAAAQAAAAoAAAAA/8AAEQgACgAKAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAf/aAAwDAQACEQMRAD8A9P8Aj/qni3w58aNel0PV9UENm3lraDUfLtpJJLeOMKlqwXYELGRX3/M3zD3/AE5tPDB+yQ7pFc7FySeTx1NeX+PfhF8J/FPjI+IfE3grRNX1UPC4u7zTba4uN0f3D5skbPlf4TnjtXvcdrbLGoEKAADjaKpQa3Z1Od9j/9k=",
    "name": "Maecenas interdum",
    "price": {
      "amount": 28700,
      "currency": {
        "code": "USD",
        "base": 10,
        "exponent": 2
      },
      "scale": 2
    },
    "isBestSeller": false,
    "leadTime": 4,
    "description": "Morbi eu ullamcorper urna, a condimentum massa. In fermentum ante non turpis cursus fringilla. Praesent neque eros, gravida vel ante sed, vehicula elementum orci. Sed eu ipsum eget enim mattis mollis."
  }
]


  const productIds = products
    .slice(0, 3) // Only pre-render our "most popular" products
    .map((product) => product.id); // ["1", "2", "3"]

  return {
    paths: productIds.map((id) => ({ params: { id } })), // [{ params: { id: "1" } }, ...]

    // Incremental Static Regeneration:
    // - Generate the rest of our product catalogue at runtime, when they are visited
    // - Balance between faster builds and caching more ahead of time
    // ["4", "5", "..."]
    fallback: 'blocking',
  };
};

// Fetch necessary data for each product when pre-rendered or revalidated

export const getStaticProps: GetStaticProps<{ product: GetProduct }> = async (
  context,
) => {
  const id = context.params?.id as string;
  const product = await getProduct(id);

  return {
    props: {
      product,
    },

    // Revalidate pages in the background without having to rebuild the entire site

    // Time based revalidation:
    // Periodically revalidate products when a new request comes in
    revalidate: 60, // At most once every 60 seconds

    // On demand revalidation:
    // Triggered by event e.g. CMS update webhook
    // Use an API route e.g. `await res.revalidate('/product/1')`
  };
};

// ===============
// 2. Dynamic Data (SSR)
// ===============

// Server Side Rendering at runtime
// export const getServerSideProps: GetServerSideProps<{
//   product: GetProduct;
// }> = async (context) => {
//   const id = context.params?.id as string;
//   const product = await getProduct(id);

//   return {
//     props: {
//       product,
//     },
//   };
// };

// =======
// 3. Page
// =======
export const runtime = "experimental-edge";

export default function Page({
  product, // passed from getStaticProps or getServerSideProps
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="space-y-8 lg:space-y-14">
      <Product product={product.product} />
      <SimilarProducts products={product.similarProducts} />
      <Reviews reviews={product.reviews} />
    </div>
  );
}
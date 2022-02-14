import { getRepository } from "typeorm";
import { Cart, CartProduct, Product } from "../entities";

interface ICart {
  cartId: string;
  productId: string;
}

export const addProduct = async (data: ICart) => {
  
  const cartRepository = getRepository(Cart);
  const cartProductRepository = getRepository(CartProduct);
  const productRepository = getRepository(Product);
  
  let cartProduct;
  
  const product = await productRepository.findOne(data.productId);

  const cart = await cartRepository.findOneOrFail({
    where: { id: data.cartId },
  });


  const findCartProduct: CartProduct = cart.products.find(
    (item: any) => item.productId === product?.id
  );

  let newTotal = Number(cart?.total);

  if (findCartProduct) {
    const cp = await cartProductRepository.findOneOrFail({
      where: { productId: product?.id },
    });

    const data = { ...cp };

    data.quantity = data.quantity + 1;

    await cartProductRepository.save({ ...data });
    cartProduct = data;
    newTotal += Number(product?.price);

  } else {
    const cp = cartProductRepository.create({
      quantity: 1,
      productId: product?.id,
      cartId: cart.id
    });

    await cartProductRepository.save(cp);
    cartProduct = cp;
    newTotal += Number(product?.price);
  }

  const serialize = {
    id: cart?.id,
    total: Number(newTotal.toFixed(2)),
    paid: cart?.paid,
    products: [...cart?.products, cartProduct],
  };

  await cartRepository.save({ ...serialize });

  return {
    cartId: cart.id,
    total: serialize.total,
    newProduct: cartProduct,
  };
};

export const findOneCart = async (cartId: string) => {
  const cartRepository = getRepository(Cart);

  const cart = await cartRepository.findOne(cartId);

  return cart;
};

export const listAllCarts = async () => {
  const cartRepository = getRepository(Cart);

  const cart = await cartRepository.find();

  return cart;
};

export const deleteProductInCart = async (productId: string, userId: string) => {
  const cartProductRepository = getRepository(CartProduct);
  const cartRepository = getRepository(Cart);

  const cart = await cartRepository.find({
    where: {owner: userId, paid: false}
  });

  const cartProduct = cart[0].products.find((item:any) => item.product.id === productId)

  if (cartProduct instanceof CartProduct) {
    await cartProductRepository.delete(cartProduct.id)
  }

  return "Product deleted"
}